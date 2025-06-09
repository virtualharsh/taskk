const nodemailer = require("nodemailer");

const sendResetEmail = async (email, link) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset your password",
        html: `
      <p>You requested a password reset</p>
      <p>Click this <a href="${link}">link</a> to reset your password</p>
      <p>This link expires in 1 hour.</p>
    `,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendResetEmail;
