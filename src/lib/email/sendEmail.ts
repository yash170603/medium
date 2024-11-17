import nodemailer from 'nodemailer';
import VerificationEmailServer from './email';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_KEY,
  },
});

export const sendVerificationEmail = async (to: string, name: string, otp: string) => {
  const htmlContent = VerificationEmailServer({ name, otp });

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: 'Verify Your Email',
    html: htmlContent,
  };

  try {
    const res = await transporter.sendMail(mailOptions);
    if (res.accepted.length === 0) {
      throw new Error('Failed to send email');
    }
    console.log('Email sent successfully');
    return { message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('There was an internal server error in sending verification mail');
  }
};
