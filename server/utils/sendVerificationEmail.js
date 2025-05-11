const nodemailer = require("nodemailer");

const sendVerificationEmail = async (toEmail, id) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, // Use an App Password if 2FA is enabled
        },
    });

    const url = `${process.env.BASE_URL}/api/auth/${id}`;

    const mailOptions = {
        from: `"Taskk: " <${process.env.EMAIL_USER}>`,
        to: toEmail, 
        subject: "Taskk Verification",
        html: `<p>Click the link to verify your email: <a href="${url}">${url}</a></p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${toEmail}`);
};

module.exports = sendVerificationEmail;
