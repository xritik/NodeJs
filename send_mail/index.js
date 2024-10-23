var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'singhritik009012@gmail.com',
    pass: 'cdwrlwwbeglvalol'
  }
});

var mailOptions = {
  from: 'singhritik009012@gmail.com',
  to: 'singhritik00901@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});