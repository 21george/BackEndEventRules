const nodemailer = require("nodemailer");

// ---------------------------------------
// Create transporter ONCE (important)
// ---------------------------------------
 const transporter = nodemailer.createTransport({
   pool: true,
   host: process.env.EMAIL_HOST,
   port: process.env.EMAIL_PORT,
   secure: process.env.EMAIL_SECURE,
   encryption: process.env.EMAIL_ENCRYPTION,
   auth: {
     user: process.env.EMAIL_USER,
     pass: process.env.EMAIL_PASS,
   },
 });

// Optional: verify connection on server start
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP connection error:", error);
  } else {
    console.log("SMTP server is ready to send emails");
  }
});

// ---------------------------------------
// Send Email Function
// ---------------------------------------
const sendEmail = async (inquiry) => {
  try {
    // -----------------------------
    // 1️⃣ EMAIL TO ADMIN
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
        <p><strong>Event Date:</strong> ${new Date(
          inquiry.eventDate,
        ).toDateString()}</p>
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
      subject: "Your Event Inquiry Confirmation",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
      </head>
      <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
                
                <!-- HEADER -->
                <tr>
                  <td align="center" style="background:#000;padding:30px;">
                    <img 
                      src="https://eventsrules.com/images/logo.png" 
                      alt="Events Rules Logo" 
                      width="150" 
                      style="display:block;margin-bottom:10px;" 
                    />
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
                      Our team will review your request and respond within 24 hours.
                    </p>

                    <hr style="border:none;border-top:1px solid #eee;margin:25px 0;" />

                    <h3>Your Event Details:</h3>

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
                    <p style="margin:5px 0;">München, Germany</p>
                    <p style="margin:5px 0;">
                      <a href="https://eventsrules.com" 
                        style="color:#d4a574;text-decoration:none;">
                        www.eventsrules.com
                      </a>
                    </p>
                    <p style="margin:5px 0;">
                      © ${new Date().getFullYear()} Events Rules
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

    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    return { success: true };
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send emails");
  }
};

module.exports = { sendEmail };
