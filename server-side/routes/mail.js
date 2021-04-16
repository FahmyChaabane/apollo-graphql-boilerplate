import smtpTransport, { mailOptions } from "../configs/nodeMailerConfig";
import express from "express";
const route = express.Router();

route.post("/", async (req, res) => {
  await smtpTransport.sendMail(
    mailOptions({ name: req.body.user, email: req.body.email }),
    function (error, info) {
      if (error) {
        console.log(error);
        return res.status(400).send("Error with mailing service."); // if error occurs send error as response to client
      } else {
        console.log("Sent Successfully: " + info.response);
        res.send(req.body.user); //if mail is sent successfully send Sent successfully as response
      }
    }
  );
  smtpTransport.close();
});

export default route;
