const User = require('../models/Users')
const path = require('path')
const dotenv = require('dotenv')
const { createUserDetails } = require('./userDetails')
const sendEmail = require('../utils/sendEmail')
const shortid = require('shortid')

//@desc Save User Details
//@route POST /api/v1/users
//@access Public
exports.saveUserDetails = async (req, res, next) => {
    try {
        //via WEB APP
         const dataObj = JSON.parse(req.body.objArr)
         console.log(dataObj)

        
        //via POSTMAN
        //const dataObj = req.body
       // console.log(dataObj)

        if(!req.files)
        {
            return res.status(400).json({ success: false, message: 'Please upload a file'})
        }
      
        const file = req.files.file

        // Make sure the image is a photo
        if(!file.mimetype.startsWith('image'))
        {
            return res.status(400).json({ success: false, message: 'Please upload an image file'})
        }
        
        //Check filesize
        if(file.size > process.env.MAX_FILE_UPLOAD){
            return res.status(400).json({success: false, message: `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`})
        }

        //Generating unique id to concate with file name
        const uid = shortid.generate()

       
        
        // Create custom filename
        file.name = `${uid}_${dataObj.Name}${path.parse(file.name).ext}`
        file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err =>{
            if(err){
                console.error(err)
                return res.status(500).json({success: false,  message: 'Problem with file upload'})
            }
        })

        dataObj.Photo =  file.name      
        
        //Saving into database
        const user = await User.create(dataObj)

        //Create PDF Template
        createUserDetails(user, `${uid}_${dataObj.Name}.pdf`, file.name)

        res.status(201).json({ success: true, message: `Your Application has been received!` })
      
        
    } 
    catch (err) {
        console.error(err)
        res.status(400).json({ success: false, message: `Application Failed: ${err.message} Please try again!`})
    }
    
}