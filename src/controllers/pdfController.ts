import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../model/userModal";
import mongoose from "mongoose";
import { log } from "console";
import JwtToken from "../services/jwtGenerate";

const jwtToken = new JwtToken();

export async function signup(req: Request, res: Response): Promise<any> {
  console.log("Signup function called");
  console.log("Request body:", req.body);

  try {
    const { userData } = req.body;

    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      console.error("Database not connected");
      return res.status(500).json({ message: "Database connection error" });
    }
    console.log("Database connected successfully");

    // Check if email already exists
    const existingUser = await UserModel.findOne({ email: userData.email });
    console.log("Existing user check result:", existingUser);

    if (existingUser) {
      console.log("Email already exists");
      return res.status(409).json({ message: "This email already exists" });
    }

    // Hash the password
    console.log("Hashing password");
    let password = userData.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword, "pass");

    // Save new user
    console.log("Creating new user");
    const newUser = new UserModel({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });

    console.log("Saving user to database");
    const savedUser = await newUser.save();
    console.log("User saved successfully:", savedUser);

    res.status(201).json({
      status: 201,
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
}
// login
export async function loginUser(req: Request, res: Response): Promise<any> {
  try {
    const { userLogin } = req.body; // Extract user login data from the request body
    console.log(userLogin, "userLogin");

    // Find the user by email
    const user = await UserModel.findOne({ email: userLogin.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords using bcrypt
    const isPasswordValid = await bcrypt.compare(
      userLogin.password as string,
      user.password
    );
    console.log(isPasswordValid, "jsjjs");

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token if authentication is successful
    const token = jwtToken.generateToken(user._id, "user");

    // Send the token in the response
    res.status(200).json({
    status:200,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Upload PDF handler
export async function uploadPDF(req: Request, res: Response): Promise<void> {
  const file = req.file;
  console.log("hellooo");

  if (!file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  // Save the file URL (where it was uploaded)
  const fileUrl = `/public/uploads/${file.filename}`;
  res.status(201).json({
    message: "File uploaded successfully",
    fileId: file.filename, // Save the filename as the file ID
    fileUrl,
  });
}

// Download PDF handler
// export async function downloadPDF(req: Request, res: Response): Promise<void> {
//   const fileId = req.params.id;

//   // Path to the extracted PDF file
//   const filePath = path.join(__dirname, '../public/uploads', fileId);

//   if (fs.existsSync(filePath)) {
//     res.download(filePath);
//   } else {
//     res.status(404).json({ message: 'File not found' });
//   }
// }
