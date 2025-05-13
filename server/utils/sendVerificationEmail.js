const nodemailer = require("nodemailer");

const sendVerificationEmail = async (toEmail, id) => {
    // Configure nodemailer with DKIM if available
    const transportConfig = {
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, // Use an App Password if 2FA is enabled
        },
        // Adding these optional settings to improve deliverability
        pool: true,
        maxConnections: 5,
        rateDelta: 20000,
        rateLimit: 5
    };
    
    // If you have DKIM set up, uncomment and configure these lines
    /* 
    if (process.env.DKIM_PRIVATE_KEY && process.env.DKIM_DOMAIN_NAME) {
        transportConfig.dkim = {
            domainName: process.env.DKIM_DOMAIN_NAME,
            keySelector: 'default',
            privateKey: process.env.DKIM_PRIVATE_KEY
        };
    }
    */
    
    const transporter = nodemailer.createTransport(transportConfig);

    const verificationUrl = `${process.env.BASE_URL}/api/auth/verify/${id}`;
    const currentYear = new Date().getFullYear();
    
    // Extract domain from email for personalization
    const userDomain = toEmail.split('@')[1];
    const userName = toEmail.split('@')[0];

    const mailOptions = {
        from: {
            name: "Taskk Support",
            address: process.env.EMAIL_USER
        },
        to: toEmail,
        subject: "Complete Your Taskk Account Registration",
        // Adding a plaintext version increases deliverability
        text: `
Hi ${userName},

Thanks for signing up with Taskk!

Please complete your registration by visiting this link:
${verificationUrl}

If you didn't request this email, you can safely ignore it.

Best regards,
The Taskk Team

© ${currentYear} Taskk. All rights reserved.
${process.env.BASE_URL}
        `,
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="x-apple-disable-message-reformatting">
            <meta name="color-scheme" content="light">
            <meta name="supported-color-schemes" content="light">
            <title>Complete Your Taskk Registration</title>
            <style>
                /* Client-specific resets */
                body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
                table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
                img { -ms-interpolation-mode: bicubic; }
                
                /* Basic resets */
                body {
                    margin: 0;
                    padding: 0;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                    line-height: 1.5;
                    background-color: #f7f7f7;
                    color: #333333;
                    height: 100vh;
                    width: 100%;
                }
                
                /* Prevent blue links in Gmail */
                a {
                    color: #2D6CDF;
                }
                
                /* Main container */
                .email-wrapper {
                    width: 100%;
                    background-color: #f7f7f7;
                    padding: 30px 0;
                }
                
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 6px;
                    overflow: hidden;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
                }
                
                /* Header with subtle branding */
                .email-header {
                    padding: 30px 0;
                    text-align: center;
                    border-bottom: 1px solid #f0f0f0;
                }
                
                .logo {
                    font-size: 28px;
                    font-weight: 600;
                    color: #2D6CDF;
                    margin: 0;
                    letter-spacing: -0.5px;
                }
                
                /* Email body with clean spacing */
                .email-body {
                    padding: 40px 40px;
                }
                
                .greeting {
                    font-size: 22px;
                    margin-top: 0;
                    margin-bottom: 20px;
                    color: #222222;
                    font-weight: 600;
                }
                
                .message {
                    margin-bottom: 25px;
                    font-size: 16px;
                    color: #444444;
                }
                
                /* Button styling for better clicks */
                .button-container {
                    text-align: center;
                    margin: 30px 0;
                }
                
                .verify-button {
                    display: inline-block;
                    background-color: #2D6CDF;
                    color: white !important;
                    text-decoration: none;
                    padding: 14px 36px;
                    border-radius: 4px;
                    font-weight: 500;
                    font-size: 16px;
                    text-align: center;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    transition: background-color 0.2s;
                    mso-padding-alt: 16px 36px;
                }
                
                /* Outlook-specific button */
                .ms-button {
                    mso-style-priority: 100 !important;
                    text-decoration: none !important;
                    display: inline-block !important;
                }
                
                .alternative {
                    margin-top: 25px;
                    font-size: 14px;
                    color: #666666;
                    border-top: 1px solid #f0f0f0;
                    padding-top: 20px;
                }
                
                /* Subdued, professional footer */
                .email-footer {
                    background-color: #f9f9f9;
                    padding: 25px 40px;
                    text-align: center;
                    font-size: 13px;
                    color: #777777;
                    border-top: 1px solid #f0f0f0;
                }
                
                .footer-links {
                    margin: 15px 0;
                }
                
                .footer-links a {
                    color: #2D6CDF;
                    text-decoration: none;
                    margin: 0 8px;
                }
                
                .address {
                    margin-top: 15px;
                    font-size: 12px;
                    color: #999999;
                }
                
                /* Compatibility table for Outlook */
                .outlook-table {
                    width: 100%;
                }
                
                .outlook-table td {
                    padding: 0;
                }
                
                @media only screen and (max-width: 600px) {
                    .email-container {
                        width: 100% !important;
                        margin: 0 auto !important;
                        border-radius: 0 !important;
                    }
                    
                    .email-body, .email-footer {
                        padding: 25px 20px !important;
                    }
                }
            </style>
            <!--[if mso]>
            <style type="text/css">
                body, table, td, a, span {font-family: Arial, sans-serif !important;}
                .button-container {padding: 20px 0;}
                .verify-button {padding: 16px 36px !important; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold;}
            </style>
            <![endif]-->
        </head>
        <body>
            <div class="email-wrapper">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                    <tr>
                        <td align="center">
                            <div class="email-container">
                                <div class="email-header">
                                    <h1 class="logo">Taskk</h1>
                                </div>
                                
                                <div class="email-body">
                                    <h2 class="greeting">Hi${userName ? ' ' + userName.charAt(0).toUpperCase() + userName.slice(1) : ''},</h2>
                                    
                                    <div class="message">
                                        <p>Thank you for creating your Taskk account. To ensure account security and to activate all features, please verify your email address.</p>
                                    </div>
                                    
                                    <div class="button-container">
                                        <!--[if mso]>
                                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${verificationUrl}" style="height:50px;v-text-anchor:middle;width:230px;" arcsize="8%" stroke="f" fillcolor="#2D6CDF">
                                        <w:anchorlock/>
                                        <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">Verify My Email</center>
                                        </v:roundrect>
                                        <![endif]-->
                                        <!--[if !mso]><!-->
                                        <a href="${verificationUrl}" class="verify-button" target="_blank">Verify My Email</a>
                                        <!--<![endif]-->
                                    </div>
                                    
                                    <div class="message">
                                        <p>This verification link will expire in 24 hours. If you did not create an account with Taskk, you can safely disregard this email.</p>
                                    </div>
                                    
                                    <div class="alternative">
                                        <p>If you're having trouble with the button above, copy and paste the URL below into your web browser:</p>
                                        <p style="word-break: break-all; font-size: 13px;"><a href="${verificationUrl}">${verificationUrl}</a></p>
                                    </div>
                                </div>
                                
                                <div class="email-footer">
                                    <p>© ${currentYear} Taskk. All rights reserved.</p>
                                    <div class="footer-links">
                                        <a href="${process.env.BASE_URL}/help" target="_blank">Help Center</a>
                                        <a href="${process.env.BASE_URL}/privacy" target="_blank">Privacy Policy</a>
                                        <a href="${process.env.BASE_URL}/terms" target="_blank">Terms of Service</a>
                                    </div>
                                    <p class="address">
                                        Sent by Taskk<br>
                                        ${process.env.COMPANY_ADDRESS || '123 Business St, Suite 100, City, ST 12345'}
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </body>
        </html>
        `,
        // Adding these headers helps prevent spam filtering
        headers: {
            'X-Priority': '1',
            'X-MSMail-Priority': 'High',
            'Importance': 'High',
            'X-Mailer': 'Taskk Mailer',
            'List-Unsubscribe': `<${process.env.BASE_URL}/unsubscribe?email=${encodeURIComponent(toEmail)}>`,
            'Feedback-ID': `${id}:taskk:${process.env.EMAIL_USER}`
        }
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error(`Failed to send verification email to ${toEmail}:`, error);
        throw error;
    }
};

module.exports = sendVerificationEmail;