import nodemailer from "nodemailer";

const userGmail = "fgp555@gmail.com";
const passAppGmail = "bjul tlrx nmec eydx";

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: userGmail,
    pass: passAppGmail,
  },
});

// Define a route for sending emails
// Set up email options
const mailOptions = {
  from: userGmail,
  to: userGmail,
  subject: "Test Email 222",
  text: "This is a test email from Node.js!",
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  }
  console.log("Email sent: " + info.response);
});