const User = require("../models/user");
//const jwt = require("jsonwebtoken");
//const expressJwt = require("express-jwt");
//const nodemailer = require("nodemailer");

exports.signup = (req, res) => {

  const {email, password} = req.body;

  

  User.findOne({ email }).exec((err, user) => {
    
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
      
    }
    const newUser = new User({ email, password});
    console.log(newUser)
    newUser.save((err, user) => {
        
        if (err) {
          console.log("SAVE USER ERROR", err);
          return res.status(401).json({
            error: "Error saving user in database. Try signup again",
          });
        }
        else {
            return res.json({
              message: "Something went wrong. Try again.",
            });
          }
        res.json(newUser);
        //createSchool(user._id)
        //return res.json({
          //message: user._id,
          //message: 'dodano usera'
        //});
      });
    
 /*
    const token = jwt.sign(
      { name, email, password, role, schoolName },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "60m" }
    );
   
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Account activation link`,
      html: `
                <h1>Please use the following link to activate your account</h1>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                <hr />
                <p>This email may contain sensetive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `,
    };
  
    sgMail
      .send(emailData)
      .then((sent) => {
        // console.log('SIGNUP EMAIL SENT', sent)
        return res.json({
          message: `Email has been sent to ${email}. Follow the instruction to activate your account`,
        });
      })
      .catch((err) => {
        // console.log('SIGNUP EMAIL SENT ERROR', err)
        return res.json({
          message: err.message,
        });
      });

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'noreply@krtcode.pl',
          pass: 'Fandango13!'
        }
      });
    
      let transporter = nodemailer.createTransport({
        
        host: "serwer2009645.home.pl",
        port: 465,
        //s
        auth: {
          user: "office@krtcode.pl",
          pass: "lXrQSG7Ot"
        }
      });

      let transporter = nodemailer.createTransport(({
        pool: true,
        //secure: true, // use TLS
        host: "serwer2009645.home.pl",
        port: 587,
          auth: {
            user: "office@krtcode.pl",
            pass: "lXrQSG7Ot"
          }
        }));

      let mailOptions = {
        from: {
          name: 'Aktywacja KrtCode',
          address: 'noreply@krtcode.pl'
        },
        to: email,
        subject: 'Account activation link',
      html: `
                    <h1>Please use the following link to activate your account</h1>
                    <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                    <hr />
                    <p>This email may contain sensetive information</p>
                    <p>${process.env.CLIENT_URL}</p>
                `,    
              
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          // console.log('SIGNUP EMAIL SENT ERROR', err)
          return res.json({
            message: err.message,
          });
        } else {
          // console.log('SIGNUP EMAIL SENT', sent)
          return res.json({
            message: `Email has been sent to ${email}. Follow the instruction to activate your account`,
          });
        }
      });
      */
  });
};