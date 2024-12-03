import User from '@/Models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import connectDB from '@/lib/connectDB';

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();
    const userExisting = await User.findOne({ email });
    if (userExisting) {
      return NextResponse.json({
        message: 'User Already existing!',
        status: 500,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();

    return NextResponse.json({
      message: 'User Registerd successfully',
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error Connecting', status: 500 });
  }
}
