import connectDB from '@/lib/connectDB';
import Post from '@/Models/Post';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();
    const { title, content } = await req.json();

    // const existingPost = await Post.findOne({ title });
    // if (existingPost) {
    //   return NextResponse.json({ message: 'post already existing' });
    // }
    const newPost = await Post({
      title,
      content,
    });
    await newPost.save();
    return NextResponse.json({ message: 'Record inserted' });
  } catch (error) {
    return NextResponse.json({ message: 'Connection problem' });
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const allPosts = await Post.find({});

    return NextResponse.json(allPosts);
  } catch (error) {
    return NextResponse.json({ message: 'Connection problem' });
  }
}
