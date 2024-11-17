import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { sendVerificationEmail } from "@/lib/email/sendEmail";

export async function POST(request: Request) {
  const { email, password, name } = await request.json() as {
    email: string;
    password: string;
    name: string;
  };

  try {
    // Check for existing unverified user
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser && !existingUser.isVerified) {
      return Response.json(
        { message: "User already exists but is not verified, please verify your account" },
        { status: 409 }
      );
    }

    // Hash password and generate OTP
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Start transaction for user creation
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, otp },
    });

    // Send email after user creation
    try {
      const emailResponse = await sendVerificationEmail(email, name, otp);
      if (!emailResponse) {
        throw new Error("Failed to send verification email");
      }
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Roll back: delete user if email fails
      await prisma.user.delete({ where: { id: user.id } });
      return Response.json(
        { message: "Error in sending verification email. Please try again." },
        { status: 500 }
      );
    }

    return Response.json(
      { message: "Successfully registered! Please verify your account." },
      { status: 200 }
    );

  } catch (error) {
    console.error("Unexpected error:", error);

    // Handle unique constraint error
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
      return Response.json(
        { message: "A verified user with the same email already exists" },
        { status: 400 }
      );
    }

    return Response.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
