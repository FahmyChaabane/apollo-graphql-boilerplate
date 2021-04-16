const nodemailer = require("nodemailer");

export default nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.PORT,
  secure: true,
  auth: {
    user: process.env.APPEMAILADRESS, // app email address
    pass: process.env.PASSWD,
  },
});

export const mailOptions = ({ name, email }) => ({
  from: process.env.APPEMAILADRESS, // app email address
  to: process.env.ADMINEMAILADRESS, // list of receivers (admin gmail adress)
  subject: "Account Delete Request", // Subject line
  html: require("./mailTemplate")(name, email), // html body
});
