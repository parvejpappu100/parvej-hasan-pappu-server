const express = require("express");
const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;

// * Middleware:
app.use(cors());
app.use(express.json());

const auth = {
  auth: {
    api_key: process.env.EMAIL_PRIVATE_KEY,
    domain: process.env.EMAIL_DOMAIN
  },
};

const transporter = nodemailer.createTransport(mg(auth));

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  transporter.sendMail(
    {
      from: email, 
      to: process.env.MY_EMAIL, 
      subject: "New Message from your Portfolio",
      html: `
        <div>
            <h3>${name}</h3>
            <p>${message}</p>
        </div>
      `, 
    },
    function (error, info) {
      if (error) {
        console.error(error);
        res.status(500).send("Error sending email");
      } else {
        console.log("Email sent: " + info.response);
        res.send("Email sent successfully");
      }
    }
  );
});

app.get("/", (req, res) => {
  res.send("Portfolio server is running");
});

app.listen(port, () => {
  console.log(`Portfolio server is running on port : ${port}`);
});
