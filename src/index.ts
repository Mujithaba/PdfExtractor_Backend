import app from './app';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;
const DB_STRING = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/PDFExtractor';

// Function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(DB_STRING);
    console.log("Successfully connected to database");
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};


const startServer = async () => {
  await connectDB(); 
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();













// import app from './app';

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
