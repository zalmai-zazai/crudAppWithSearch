import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    // If mongoose is already connected, no need to connect again
    console.log('Already connected to the database.');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to the database.');
  } catch (error) {
    console.error('Failed to connect to the database.', error);
    throw error;
  }
};

export default connectDB;
