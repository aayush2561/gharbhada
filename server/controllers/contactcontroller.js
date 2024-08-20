const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendContactEmail = async (req, res) => {
  const { name, email, subject, description } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.RECEIVER_MAIL,
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nDescription: ${description}`,
  };

  await transporter.sendMail(mailOptions);
  res.status(200).send('Message sent successfully!');
};

module.exports = sendContactEmail;
