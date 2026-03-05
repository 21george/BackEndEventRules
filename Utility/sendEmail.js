const nodemailer = require("nodemailer");

const sendEmail = async (inquiry) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // -----------------------------
  // 1️⃣ EMAIL TO ADMIN (YOU)
  // -----------------------------
  const adminMailOptions = {
    from: `"Event Inquiry" <${process.env.EMAIL_USER}>`,
    to: process.env.RECEIVING_EMAIL,
    subject: `New Inquiry: ${inquiry.subject}`,
    html: `
      <h2>New Event Inquiry</h2>
      <p><strong>Name:</strong> ${inquiry.name}</p>
      <p><strong>Email:</strong> ${inquiry.email}</p>
      <p><strong>Phone:</strong> ${inquiry.phone || "N/A"}</p>
      <p><strong>Event Date:</strong> ${new Date(inquiry.eventDate).toDateString()}</p>
      <p><strong>Guest Count:</strong> ${inquiry.guestCount}</p>
      <p><strong>Event Type:</strong> ${inquiry.eventType}</p>
      <p><strong>Services:</strong> ${inquiry.serviceInterest.join(", ")}</p>
      <p><strong>Message:</strong></p>
      <p>${inquiry.message}</p>
    `,
  };

  // -----------------------------
  // 2️⃣ CONFIRMATION EMAIL TO CLIENT
  // -----------------------------
  const clientMailOptions = {
    from: `"Events Rules" <${process.env.EMAIL_USER}>`,
    to: inquiry.email,
    subject: "Email confirmation ",
    html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Event Inquiry Confirmation</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:20px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
            
            <!-- HEADER -->
            <tr>
              <td align="center" style="background:#000;padding:30px;">
                <img src="../Utility/Images/event-rules-high-resolution-logo-transparent.png" 
                     alt="Events Rules Logo" 
                     width="150" 
                     style="display:block;margin-bottom:10px;" />
                <h1 style="color:#d4a574;margin:0;font-size:22px;letter-spacing:2px;">
                  EVENTS RULES
                </h1>
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:30px;color:#333;">
                <h2 style="margin-top:0;color:#d4a574;">
                  Thank You, ${inquiry.name}!
                </h2>

                <p>
                  We’ve successfully received your event inquiry. 
                  Our team will carefully review your request and respond within 24 hours.
                </p>

                <hr style="border:none;border-top:1px solid #eee;margin:25px 0;" />

                <h3 style="margin-bottom:10px;">Your Event Details:</h3>

                <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;">
                  <tr>
                    <td><strong>Event Date:</strong></td>
                    <td>${new Date(inquiry.eventDate).toDateString()}</td>
                  </tr>
                  <tr>
                    <td><strong>Guest Count:</strong></td>
                    <td>${inquiry.guestCount}</td>
                  </tr>
                  <tr>
                    <td><strong>Event Type:</strong></td>
                    <td>${inquiry.eventType}</td>
                  </tr>
                  <tr>
                    <td><strong>Services:</strong></td>
                    <td>${inquiry.serviceInterest.join(", ")}</td>
                  </tr>
                </table>

                <p style="margin-top:25px;">
                  If you need to update any information, simply reply to this email.
                </p>

                <!-- CTA BUTTON -->
                <div style="text-align:center;margin-top:30px;">
                  <a href="https://eventsrules.com"
                     style="background:#d4a574;color:#000;
                            padding:12px 25px;
                            text-decoration:none;
                            border-radius:30px;
                            font-weight:bold;
                            display:inline-block;">
                    Visit Our Website
                  </a>
                </div>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td align="center" style="background:#000;color:#aaa;padding:20px;font-size:12px;">
                <p style="margin:5px 0;color:#d4a574;font-weight:bold;">
                  EVENTS RULES
                </p>
                <p style="margin:5px 0;">
                  München, Germany
                </p>
                <p style="margin:5px 0;">
                  <a href="https://eventsrules.com" 
                     style="color:#d4a574;text-decoration:none;">
                    www.eventsrules.com
                  </a>
                </p>
                <p style="margin:5px 0;">
                  © ${new Date().getFullYear()} Events Rules. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `,
  };

  // Send both emails
  await transporter.sendMail(adminMailOptions);
  await transporter.sendMail(clientMailOptions);
};

module.exports = { sendEmail };
