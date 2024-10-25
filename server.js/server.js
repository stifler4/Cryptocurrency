const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the CORS middleware

const app = express();
const PORT = 3000;

// Use CORS middleware to allow requests from different origins
app.use(cors()); // Allows all origins
// To allow specific origins, use: app.use(cors({ origin: 'http://127.0.0.1:5500' }));

// Use body-parser middleware to parse incoming requests
app.use(bodyParser.json());

// Handle preflight requests (OPTIONS)
app.options("*", cors());

// Route to handle sending the signup confirmation email
app.post("/send-email", (req, res) => {
  const { email, name } = req.body;

  // Configure Nodemailer transporter with your email provider
  let transporter = nodemailer.createTransport({
    service: "gmail", // You can use other services like SendGrid, Outlook, etc.
    auth: {
      user: "willamgate444email@gmail.com", // Your email
      pass: "stephen", // Your email password or app-specific password if using Gmail
    },
  });

  // Setup email options
  let mailOptions = {
    from: '"Your App Name" <willamgate444@gmail.com>', // Sender address
    to: email, // Receiver's email
    subject: "Signup Successful!",
    text: `Hello ${name},\n\nThank you for signing up to our service!\n\nBest regards,\nYour App Team`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Error sending email");
    }
    res.status(200).send("Email sent successfully");
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
