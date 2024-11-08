import bcrypt from "bcryptjs";
 
import { prisma } from "@/app/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json() as {
      email: string;
      password: string;
      name: string;
    };

    // Check for existing unverified user
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      if (!existingUser.isVerified) {
        return Response.json(
          { message: "User already exists but is not verified, please verify your account" },
          { status: 409 }
        );
      }
    }

    // Hash password and generate OTP
    const passwordd = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.user.create({
      data: {
        email,
        password:passwordd,
        name,
        otp,
      },
    });

    return Response.json(
      { message: "Successfully registered! Please verify your account." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    // Handle Prisma unique constraint error
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
      return Response.json(
        { message: "A verified user with the same email already exists" },
        { status: 400 }
      );
    }

    // Handle unexpected errors
    return Response.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
