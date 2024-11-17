const VerificationEmailServer = ({ name, otp  }: { name: string; otp: string; }): string => {
    return `
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
        </head>
        <body style="background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; line-height: 1.6; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 20px;">
            </div>
            <div style="background-color: #ffffff; border: 1px solid #e6e6e6; border-radius: 5px; padding: 30px;">
              <h1 style="color: #292929; font-size: 24px; font-weight: 600; margin-bottom: 20px; text-align: center;">Verify Your Email</h1>
              <p style="color: #292929; font-size: 16px; margin-bottom: 20px;">Hi ${name},</p>
              <p style="color: #292929; font-size: 16px; margin-bottom: 20px;">To complete your email verification, please use the following One-Time Password (OTP):</p>
              <div style="background-color: #f9f9f9; border: 1px solid #e6e6e6; border-radius: 5px; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 30px 0; padding: 20px; text-align: center;">
                ${otp}
              </div>
              <p style="color: #292929; font-size: 16px; margin-bottom: 20px;">This OTP will expire in 10 minutes. If you didn't request this verification, please ignore this email.</p>
              <p style="color: #292929; font-size: 16px; margin-bottom: 20px;">
                Best regards,<br>
                BlogVerse
              </p>
            </div>
            <div style="color: #757575; font-size: 14px; margin-top: 30px; text-align: center;">
              <p>
                Write to us at - admin@yashxbuilds.me
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  };
  
  export default VerificationEmailServer;