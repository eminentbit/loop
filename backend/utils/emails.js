import transporter from "./transporter.js";
import dotenv from "dotenv";
dotenv.config();

export const sendVerificationEmail = (email, verificationUrl) => {
  transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Verify Your Email",
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 30px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 25px;">
          <!-- Email Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#1a73e8" viewBox="0 0 24 24" style="margin-bottom: 10px;">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
          <h2 style="color: #1a73e8; font-weight: 700; font-size: 28px; margin: 0;">Verify Your Email</h2>
        </div>

        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 25px;">
          To complete your registration, please verify your email by clicking the button below:
        </p>

        <div style="text-align: center; margin-bottom: 30px;">
          <a href="${verificationUrl}" target="_blank" 
            style="
              display: inline-block;
              background-color: #1a73e8;
              color: #fff;
              padding: 14px 32px;
              font-size: 16px;
              font-weight: 600;
              border-radius: 6px;
              text-decoration: none;
              box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
              transition: background-color 0.3s ease;
            "
            onmouseover="this.style.backgroundColor='#155ab6'"
            onmouseout="this.style.backgroundColor='#1a73e8'"
          >
            Verify Email
          </a>
        </div>

        <p style="font-size: 14px; color: #555; margin-bottom: 10px;">
          Or copy and paste the link below into your browser:
        </p>
        <p style="
          background-color: #f9f9f9; 
          padding: 12px 16px; 
          border-radius: 6px; 
          font-size: 14px; 
          word-break: break-word; 
          color: #1a73e8;
        ">
          <a href="${verificationUrl}" style="color: #1a73e8; text-decoration: none;">${verificationUrl}</a>
        </p>

        <p style="font-size: 13px; color: #999; margin-top: 30px;">
          This link will expire in 24 hours.
        </p>

        <hr style="margin: 35px 0; border: none; border-top: 1px solid #e0e0e0;" />

        <footer style="text-align: center; font-size: 13px; color: #777; line-height: 1.4;">
          <p style="margin: 0 0 8px;">&copy; ${new Date().getFullYear()} LoopOS. All rights reserved.</p>
          <p style="margin: 0;">If you did not request this email, please ignore it.</p>
        </footer>
      </div>
    `,
  });
};

export const sendWelcomeEmail = (email, fullName) => {
  transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Welcome to LoopOS!",
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 30px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 25px;">
          <!-- Welcome Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#1a73e8" viewBox="0 0 24 24" style="margin-bottom: 10px;">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <h2 style="color: #1a73e8; font-weight: 700; font-size: 28px; margin: 0;">Welcome to LoopOS, ${fullName}!</h2>
        </div>

        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
          Thank you for joining our community. Your account has been successfully verified.
        </p>
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
          You can now log in and start exploring all our features.
        </p>
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
          If you have any questions, feel free to reach out to our support team.
        </p>

        <p style="font-size: 16px; margin-bottom: 5px;">Best regards,</p>
        <p style="font-size: 16px; font-weight: 600; color: #1a73e8;">The LoopOS Team</p>

        <hr style="margin: 35px 0; border: none; border-top: 1px solid #e0e0e0;" />

        <footer style="text-align: center; font-size: 13px; color: #777; line-height: 1.4;">
          <p style="margin: 0 0 8px;">&copy; ${new Date().getFullYear()} LoopOS. All rights reserved.</p>
          <p style="margin: 0;">If you did not create this account, please contact support immediately.</p>
        </footer>
      </div>
    `,
  });
};
