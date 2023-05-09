const Contact = require('../models/ContactForm');
const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');
const successEmail = fs.readFileSync('./views/FormSubmition/ContactSuccess.ejs','utf-8');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'stevie.kihn@ethereal.email',
        pass: '8E1tuCPndZGVnuVuz2'
    }
});

module.exports.sendForm = async (req , res) => {
    try{
        const { name , email , message } = req.body;
        const isMessage = await Contact.findOne({message});
        if(isMessage){
          return res.render('ContactForm', {
            PageTitle: 'Contact Us Page | File Sharing ',
            message: 'This Message Already Sent ,Send New Message Please.'
          });
        }
        const newMessage = await new Contact({
          name,
          email,
          message
        });
        await newMessage.save();
        const renderedTemplate = ejs.render(successEmail,{ newMessage });
        // Construct the password reset email
        const mailOptions = {
          from: 'Saurabh Dixit <smartds2550@gmail.com >' ||process.env.SMTP_FROM_EMAIL ,
          to: newMessage.email,
          subject: `Contact Submitted Successfull`,
          html: renderedTemplate,
        };
        // Send the email
        transporter.sendMail(mailOptions, (error) => {
          if (error) {
            console.log('An error occurred: ' + error.message);
            return res.render('index' ,{
                PageTitle: 'Home Page |  Weather App',
                message: `Oops! Error:${error.message}`,
                weather: null 
            });
          } else {
            return res.render('ContactForm', {
              PageTitle: 'Contact Us Page |  Weather App ',
              message: 'Successfully Submitted Contact Form.'

            });
          }
        });
    }catch(error){
        console.log('An error occurred: ' + error.message);
        return res.render('index' ,{
          PageTitle: 'Home Page |  Weather App',
          message: `Oops! Error:${error.message}`,
          weather: null
        });
    }
}