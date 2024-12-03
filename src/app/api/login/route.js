import User from '@/Models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import connectDB from '@/lib/connectDB';

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();
    const userExisting = await User.findOne({ email });
    if (!userExisting) {
      return NextResponse.json({ message: 'User was not found!', status: 404 });
    }
    const comaprePassword = await bcrypt.compare(
      password,
      userExisting.password
    );

    if (!comaprePassword) {
      return NextResponse.json({
        message: 'User name or Password is incorrect',
        status: 500,
      });
    }
    const loginUser = userExisting.name;
    return NextResponse.json({
      message: 'success',
      status: 201,
      user: loginUser,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error Connecting', status: 500 });
  }
}
