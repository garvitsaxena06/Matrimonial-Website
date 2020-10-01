const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const fileupload = require('express-fileupload')
const path = require('path')
const fs = require('fs') 
const xss = require('xss-clean')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const sendEmail = require('./utils/sendEmail')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const helmet = require('helmet')
const User = require('./models/Users')
const mongoSanitize = require('express-mongo-sanitize')

// Payment Gateway Setup via RazorPay
const crypto = require('crypto')
const Razorpay = require('razorpay')

var amnt;
//Initialisation SECRET
var secret = process.env.RAZOR_KEYSECRET;

// Load env vars
dotenv.config({ path: './config/config.env' })


// Initialisation of RAZOR PAY
const instance = new Razorpay({
    key_id: process.env.RAZOR_KEYID,
    key_secret: process.env.RAZOR_KEYSECRET
})

//Connect to database
connectDB()

const app = express()

//Body parser
app.use(express.json())
const urlencodedParser = bodyParser.urlencoded({ extended: false})

app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use('/css', express.static(__dirname + '/public/css'));
//app.use('/js', express.static(__dirname +'/public/js'));

//Enable CORS
app.use(cors())

//Dev logging middleware
if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'))
}

//Rendering HTML Page
app.get('/', (req, res) => {
    res.render('index')
});

//File Uploading
app.use(fileupload())

// Sanitize data
app.use(mongoSanitize())

// Set Security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, //10 minutes
    max: 100
})

app.use(limiter)

// Prevent http param pollution
app.use(hpp())

// Mount Routers
app.use('/api/v1/users', require('./routes/users'))

//Payment API Auth
app.post("/order", urlencodedParser, (req, res) => {
    var amnt = req.body.amount;
    var options = {
      amount: amnt,
      currency: "INR",
      receipt: req.body.itemId,
      notes: [req.body.itemDesc, req.body.user_name, req.body.user_mobile],
    };
    instance.orders.create(options, (err, order) => {
        res.render("pay", {
        orderId: order.id,
        amnt: order.amount / 100,
        price: req.body.amount / 100,
        tot_price: amnt / 100,
        desc: order.notes[0],
        name: order.notes[1],
        mobilenumber: order.notes[2]
      });
    });
  });


  app.post("/success", urlencodedParser, (req, res) => {
    var generated_signature = crypto.createHmac('sha256', process.env.RAZOR_KEYSECRET).update(req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id).digest('hex');

    if (generated_signature == req.body.razorpay_signature) {
     
      instance.orders.fetch(req.body.razorpay_order_id,  (err, order) => {
        // Updating Database with Payment Info
        if(!err)
        {
            //Updating Payment's Info Values
            User.findOneAndUpdate({ MobileNumber: order.notes[2]}, {Payment: "Yes", PaymentId: req.body.razorpay_payment_id, RazorPayOrderId: req.body.razorpay_order_id})

            User.findOne({MobileNumber: order.notes[2]}, async function(err, dataObj){

                if(!err)
                {
                  //Send Email
                  await sendEmail({
                  subject: `Second Rishta - ${dataObj.Name}`,
                  message: `Received an attachment (PDF)`,
                  filename: `${dataObj.uid}_${dataObj.Name}.pdf`,
                  path: `${process.env.FILE_UPLOAD_PDF}/${dataObj.uid}_${dataObj.Name}.pdf`
                  }) 

                  //Redirected to Success Page
                res.render("success", {
                  refid: req.body.razorpay_payment_id,
                  price: order.amount / 100,
                  desc: order.notes[0],
                  name: order.notes[1],
                  mobilenumber: order.notes[2]
                });

                 //Deleting the PDF File generated 
                 fs.unlink(`${process.env.FILE_UPLOAD_PDF}/${dataObj.uid}_${dataObj.Name}.pdf`, (err) => {
                  if(!err)
                  {
                    console.log("File PDF Deleted")
                  }
                  else
                  {
                    console.error(err)
                  }
                })
                }
            })
        }
          else
          {
            console.error(err)
          }
      });
    }
  });

app.use((req, res) => {
  res.sendStatus(404).send("Page Does not Exist!");
})

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`)
    //Close server & exit process
    server.close(() => process.exit(1))
})