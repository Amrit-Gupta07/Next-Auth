import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'; // Use import syntax for TypeScript

const prisma = new PrismaClient();
interface SignupRequest {
    email : string,
    password : string
    name: string,
}
export async function GET(req: NextRequest) {
    return NextResponse.json({
        "name" :"amrit"
    })
    
}
export async function POST(req: NextRequest) {
  const body = await req.json();

  const {email, password,name} = body as SignupRequest

  if (!email || !password) {
    return NextResponse.json({
      success: false,
      status: 400,
      message: "Enter both username and password",
    }, { status: 400 }); // Ensure the response has a correct status code
  }

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        status: 409,
        message: "User already exists",
      }, { status: 409 });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create the new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Respond with success
    return NextResponse.json({
      success: true,
      message: "User created successfully",
      user: {
        id: user.id,
        email: user.email,
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Internal Server Error",
    }, { status: 500 });
  } finally {
    // Ensure the Prisma Client is disconnected
    await prisma.$disconnect();
  }
}
