const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// * Middleware:
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: `${process.env.MY_EMAIL}`, // replace with your email address
    pass: `${process.env.EMAIL_PASS}`, // replace with your email password
  },
});

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  // Create the email content
  const mailOptions = {
    from: email,
    to: `${process.env.MY_EMAIL}`, // replace with your email address
    subject: "New Message from your Portfolio",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully");
    }
  });
});

app.get("/", (req, res) => {
  res.send("Portfolio server is running");
});

app.listen(port, () => {
  console.log(`Portfolio server is running on port : ${port}`);
});
