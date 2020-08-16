const fs = require("fs");
const PDFDocument = require("pdfkit");

//Main Function to call
function createUserDetails(data, filename, image) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  //generateHeader(doc, image);
  generateDetails(doc, data, image);
  
  doc.end();
  doc.pipe(fs.createWriteStream(`${process.env.FILE_UPLOAD_PDF}/${filename}`));
}



// Filling Information
function generateDetails(doc, data, image) {
  //Defining Space value
  //Difference between Headline and HR is 25
  //Difference between each line is 15
  let x = 15, y = 25

  //Generating Border
  doc
    .rect(25,5,550,750).stroke()

  //1st Head Line Text
  doc
    .fillColor("#444444")
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("Basic Information", 220, 10);
     generateHr(doc, 35);

    
  const fixedTop = 50;

  //Image Placeholder
  doc.rect(400,50,150,150).stroke()
  doc.image(`${process.env.FILE_UPLOAD_PATH}/${image}`, 400, 50, {fit: [150,150], align: 'center', valign: 'center'})

  doc
    .fontSize(10) 
    .fillColor('red')
    .font("Helvetica")
    .text("Name:", 50, fixedTop)
    .text("Date of Birth:", 50, fixedTop + 15)
    .text("Mobile Number:", 50, fixedTop + 30)
    .text("Marital Status:", 50, fixedTop + 45)
    .text("Gender:", 50, fixedTop + 60)
    .text("Children:", 50, fixedTop + 75)
    .text("Height:", 50, fixedTop + 90)
    .text("Complexion:", 50, fixedTop + 105)
    .text("Body Type:", 50, fixedTop + 120)
    .text("Mother Tongue:", 50, fixedTop + 135)


    .font("Helvetica-Bold")
    .fillColor('blue')
    .text(data.Name, 200, fixedTop)
    .text(data.DOB, 200, fixedTop + 15)
    .text(data.MobileNumber, 200, fixedTop + 30)
    .text(data.MaritalStatus,200,fixedTop + 45)
    .text(data.Gender,200,fixedTop + 60)
    .text(data.Children,200,fixedTop + 75)
    .text(data.Height,200,fixedTop + 90)
    .text(data.Complexion,200,fixedTop + 105)
    .text(data.BodyType,200,fixedTop + 120)
    .text(data.MotherTongue,200,fixedTop + 135)  // 50 + 120 = 170
    .moveDown();
  
    // 2nd Headline Text
    doc
      .fillColor("#444444")
      .fontSize(16)
      .font("Helvetica-Bold")
      .text("Education & Career", 50, fixedTop + 160)
      generateHr(doc, fixedTop + 185);
    
      doc  
      .fontSize(10)
      .fillColor('red')
      .font("Helvetica")
      .text("Education:",50,fixedTop + 200)
      .text("Education Details:", 50, fixedTop + 215)
      .text("Occupation:", 50, fixedTop + 230)
      .text("Occupation Details:", 50, fixedTop + 245)
      .text("Annual Income:", 50, fixedTop + 260)

      .font("Helvetica-Bold")
      .fillColor('blue')
      .text(data.Education,200,fixedTop + 200)
      .text(data.EducationDetails,200,fixedTop + 215)
      .text(data.Occupation,200,fixedTop + 230)
      .text(data.OccupationDetails,200,fixedTop + 245)
      .text(data.AnnualIncome,200,fixedTop + 260) // 50 + 245 = 295


      // CHILD SUB HEAD
      if(data.Children == 'Yes'){
        doc
       .fillColor("#444444")
       .fontSize(16)
       .font("Helvetica-Bold")
       .text("Children", 335, fixedTop + 160)

       if(data.NoOfSons != 0){

        doc  
       .fontSize(10)
       .fillColor('red')
       .font("Helvetica")
       .text("No of Son:",335, fixedTop + 200)
       .font("Helvetica-Bold")
       .fillColor('blue')
       .text(data.NoOfSons,435,fixedTop + 200)
       }

       if(data.NoOfDaughters != 0){
        doc  
        .fontSize(10)
        .fillColor('red')
        .font("Helvetica")
        .text("No. of Daughter:", 335, fixedTop + 215)
        .font("Helvetica-Bold")
        .fillColor('blue')
        .text(data.NoOfDaughters,435,fixedTop + 200)

       }
      }
       

    // 3rd Headline TEXT
    doc
      .fillColor("#444444")
      .font("Helvetica-Bold")
      .fontSize(16)
      .text("Family Background", 50, fixedTop + 285)
      generateHr(doc, fixedTop + 310);  

    doc  
      .fontSize(10)
      .fillColor('red')
      .font("Helvetica")
      .text("Father Name:",50,fixedTop + 325)
      .text("Father's Occupation:", 50, fixedTop + 340)
      .text("Father's Mobile Number:", 50, fixedTop + 355)
      .text("Mother Name:", 50, fixedTop + 370)
      .text("Mother's Occupation:", 50, fixedTop + 385)
      .text("Mother's Mobile Number:", 50, fixedTop + 400)
      .text("Parents Address:", 50, fixedTop + 445)
      .text("Family Occupation:", 50, fixedTop + 415)
      .text("Annual Family Income:", 50, fixedTop + 430)
      .text("Unmarried Brothers:", 50, fixedTop + 460)
      .text("Unmarried Sisters:", 50, fixedTop + 475)
      .text("Married Brothers:", 50, fixedTop + 490)
      .text("Married Sisters:", 50, fixedTop + 505)

      .font("Helvetica-Bold")
      .fillColor('blue')
      .text(data.FatherName,200,fixedTop + 325)
      .text(data.FatherOccupation,200,fixedTop + 340)
      .text(data.FatherMobileNumber,200,fixedTop + 355)
      .text(data.MotherName,200,fixedTop + 370)
      .text(data.MotherOccupation,200,fixedTop + 385)
      .text(data.MotherMobileNumber,200,fixedTop + 400)
      .text(data.ParentAddress,200,fixedTop + 445)
      .text(data.FamilyOccupation,200,fixedTop + 415)
      .text(data.AnnualFamilyIncome,200,fixedTop + 430)
      .text(data.UnmarriedBrothers,200,fixedTop + 460)
      .text(data.UnmarriedSisters,200,fixedTop + 475)  
      .text(data.MarriedBrothers,200,fixedTop + 490) 
      .text(data.MarriedSisters,200,fixedTop + 505) 

      // 4th Headline TEXT
      doc
      .fillColor("#444444")
      .font("Helvetica-Bold")
      .fontSize(16)
      .text("Socio - Religious Background", 315, fixedTop + 285)  

      doc  
      .fontSize(10)
      .fillColor('red')
      .font("Helvetica")
      .text("Religion:",335,fixedTop + 325)
      .text("Community:", 335, fixedTop + 340)
      .text("Caste:", 335, fixedTop + 355)
      .text("Sub Caste:", 335, fixedTop + 370)
      .text("Family Values:", 335, fixedTop + 385)
      .text("Eating Habits:", 335, fixedTop + 400)
      .text("Drinking Habits:", 335, fixedTop + 415)
      .text("Smoking Habits:", 335, fixedTop + 430)

      .font("Helvetica-Bold")
      .fillColor('blue')
      .text(data.Religion,435,fixedTop + 325)
      .text(data.Community,435,fixedTop + 340)
      .text(data.Caste,435,fixedTop + 355)
      .text(data.SubCaste,435,fixedTop + 370)
      .text(data.FamilyValues,435,fixedTop + 385)
      .text(data.EatingHabits,435,fixedTop + 400)
      .text(data.DrinkingHabits,435,fixedTop + 415)
      .text(data.SmokingHabits,435,fixedTop + 430) // 50 + 405 = 455

      //5th HEADLINE Text
      doc
      .fillColor("#444444")
      .font("Helvetica-Bold")
      .fontSize(16)
      .text("Astro Info", 50, fixedTop + 530)  
      generateHr(doc, fixedTop + 555);  

      
      doc  
      .fontSize(10)
      .fillColor('red')
      .font("Helvetica")
      .text("Sun Sign:",50,fixedTop + 570)
      .text("Time of Birth:", 50, fixedTop + 585)
      .text("Country of Birth:", 50, fixedTop + 600)
      .text("City of Birth:", 50, fixedTop + 615)
      .text("Sakha Gotra:", 50, fixedTop + 630)
      .text("Manglik:", 50, fixedTop + 645)

      .font("Helvetica-Bold")
      .fillColor('blue')
      .text(data.SunSign,200,fixedTop + 570)
      .text(data.Time,200,fixedTop + 585)
      .text(data.Country,200,fixedTop + 600)
      .text(data.City,200,fixedTop + 615)
      .text(data.SakhaGotra,200,fixedTop + 630) // 50 + 530  = 580
      .text(data.Manglik,200,fixedTop + 645)

      //6th HEADLINE Text
      doc
      .fillColor("#444444")
      .font("Helvetica-Bold")
      .fontSize(16)
      .text("Location", 335, fixedTop + 530)
      

      
      doc  
      .fontSize(10)
      .fillColor('red')
      .font("Helvetica")
      .text("Citizenship:",335, fixedTop + 570)
      .text("Resident Status:", 335,  fixedTop + 585)
      .text("Current Residence:", 335, fixedTop + 600)

      .font("Helvetica-Bold")
      .fillColor('blue')
      .text(data.Citizenship,435, fixedTop + 570)
      .text(data.ResidentialStatus,435, fixedTop + 585)
      .text(data.CurrentResidence,435, fixedTop + 600) // 50 + 625 = 675
      //generateHr(doc, fixedTop + 675);

}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

module.exports = {
  createUserDetails
};
