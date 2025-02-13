import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import OTP from "../models/otpModel.js";
import SeminarRegistration from "../models/registerModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";

dotenv.config();
//User Landing Page
const landingPage = (req, res) => {
    res.send("User landing page");
  };
  
// Email Transporter Setup
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// Request OTP 
const requestOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otpCode = generateOTP();
    await OTP.deleteMany({ email });
    await OTP.create({ email, otp: otpCode, expiresAt: Date.now() + 10 * 60 * 1000 });
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otpCode}. It will expire in 10 minutes.`,
    });
    res.status(200).json({ message: "OTP sent successfully." });
  } catch (error) {
    console.error("OTP request error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//user signup
const signUp = async (req, res) => {
  try {
    
    const { name, email, password, otp } = req.body;
    console.log('signup',req.body)
    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord || otpRecord.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    await OTP.deleteOne({ email });
    return res.status(201).json({success:true, message: "User registered successfully!" });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Reset password
const resetPassword = async (req, res) => {
    try {
      const { email, otp, password } = req.body;
      const otpRecord = await OTP.findOne({ email });
      if (!otpRecord) {
        return res.status(400).json({ message: "OTP not found. Request a new one." });
      }
      if (otpRecord.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP. Please try again." });
      }
      if (otpRecord.expiresAt < Date.now()) {
        return res.status(400).json({ message: "OTP has expired. Request a new one." });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.findOneAndUpdate({ email }, { password: hashedPassword });
      await OTP.deleteOne({ email });
      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      console.error("Password reset error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

//login page
  const login = async (req, res) => {
    try {
      console.log('body',req.body)
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({message: "User not found" });
        }
       
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }
        
        // Create JWT token
        const token = jwt.sign({ userId: user._id,userName: user.name,userEmail: user.email,registerStatus: user.registered }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Send response with `registered` status
        res.status(200).json({
            success:true,
            message: "Login successful",
            token,
            registered: user.registered // Simply return the boolean from user model
        });

    } catch (error) {
        console.error("Login error:", error);
       
        res.status(500).json({ message: "Internal Server Error" });
    }
};





 const registerSeminar = async (req, res) => {
  try {
     console.log(req.body)
     
     const image = req.file
console.log(image.path)
     let result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });
     let imageUrl = result.secure_url;

    const { 
      userId, 
      mobileNumber, 
      age, 
      gender, 
      institution, 
      role, 
      country,
      state,
      district,
      city,
      image1=imageUrl,
      accommodation,
      postalCode,
    } = req.body;
     
    // Validate required fields
    if (!userId || !mobileNumber || !age || !gender || !institution || !role  || !image1) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user is already registered
    const existingRegistration = await SeminarRegistration.findOne({  userId: new mongoose.Types.ObjectId(userId) });
    if (existingRegistration) {
      return res.status(400).json({ message: "User already registered for the seminar" });
    }

    // Create new registration
    const newRegistration = new SeminarRegistration({
      userId,
      mobileNumber,
      age,
      gender,
      institution,
      role,
      address: {
        country:country,
        state:state,
        district:district,
        city:city,
        postalCode:postalCode
      },
      accommodation:accommodation.status,
      applicationStatus: "pending",
      approvalStatus: false,
      image1,
         reason:"none",
      date: new Date()
    });


    await newRegistration.save();

    // Update user model to mark as registered
    await User.findByIdAndUpdate(userId, { registered: true });

    res.status(200).json({success:true, message: "Seminar registration successful", registered: true });
  } catch (error) {
    console.error("Seminar Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserRegistration = async (req, res) => {
    try {
       
      const userId = req.user.id; // Extracted from JWT token
     
      const registration = await SeminarRegistration.findOne({ userId }).populate("userId", "name email");
      if (!registration) {
        return res.status(404).json({ message: "No registration found" });
      }
      res.status(200).json(registration);
    } catch (error) {
      console.error("Error fetching user registration:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }; 
     

  const getFormData = async (req, res) => {
    try {
      const { userId } = req.query;
      console.log(`Received user ID: ${userId}`);
  
   
  
      const getData = await SeminarRegistration.find({ userId: new mongoose.Types.ObjectId(userId) })
        .populate("userId", "name email");
   
      if (!getData.length) {
        return res.status(404).json({ message: "No registrations found" });
      }
      const userData = {
        image:getData[0].image1,
        name: getData[0].userId.name,
        age: getData[0].age,
        gender: getData[0].gender,
        email: getData[0].userId.email,
        mobileNumber: getData[0].mobileNumber,
        country: getData[0].address.country,
        state: getData[0].address.state,
        district: getData[0].address.district,
        city: getData[0].address.city,
        postalcode:getData[0].address.postalCode,
        institution: getData[0].institution
        
      };
      
   
      res.status(200).json(userData);
  
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const updateFormData = async (req, res) => {
    try {
      console.log("Request body:", req.body);
  
      const { userId } = req.query;
      console.log('User ID:', userId);
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      let imageUrl = null;
  
      if (req.file) {
        const existingUser = await SeminarRegistration.findOne({ userId: new mongoose.Types.ObjectId(userId) });
  
        if (existingUser && existingUser.image1) {
          const publicIdMatch = existingUser.image1.match(/\/([^/]+)\.[^.]+$/);
          if (publicIdMatch) {
            const publicId = publicIdMatch[1];
            await cloudinary.uploader.destroy(publicId);
            console.log("Old image deleted:", publicId);
          }
        }
  
        // Upload new image
        const uploadResponse = await cloudinary.uploader.upload(req.file.path, { resource_type: 'image' });
        imageUrl = uploadResponse.secure_url;
      }
  
      const {
        name, age, gender, email, mobileNumber, country, state, district, city, postalcode, institution
      } = req.body;
  
      // Update user registration
      const updatedData = await SeminarRegistration.findOneAndUpdate(
        { userId: new mongoose.Types.ObjectId(userId) },
        {
          $set: {
            ...(imageUrl && { image1: imageUrl }), // Update image only if uploaded
            age,
            gender,
            mobileNumber: mobileNumber,
            institution,
            "address.country": country,
            "address.state": state,
            "address.district": district,
            "address.city": city,
            "address.postalCode": postalcode
          }
        },
        { new: true }
      ).populate("userId", "name email");
  
      if (!updatedData) {
        return res.status(404).json({ message: "User registration not found" });
      }
  
      // Update User model if name or email changes
      await User.findByIdAndUpdate(userId, { name, email });
  
      res.status(200).json({ message: "User data updated successfully", updatedData });
  
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  const Status = async (req, res) => {
    try {
      var data={}
      const { userId } = req.query;
  console.log(userId)
      // Find a single seminar registration by userId
      const registration = await SeminarRegistration.findOne({userId: new mongoose.Types.ObjectId(userId) }, "approvalStatus applicationStatus");
   
      if (!registration) {
        return res.status(404).json({ message: "No record found for this user" });
      } 
  
      // Return the approval status
      if(registration.approvalStatus==true){
        data.status='approved'
      }else{
        if(registration.applicationStatus=="rejected"){
            data.status=registration.applicationStatus
            const reason = await SeminarRegistration.findOne({userId: new mongoose.Types.ObjectId(userId) }, "reason");
          data.reason=reason.reason
        }else{
          data.status=registration.applicationStatus

        }
      }
      console.log(data)
    
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
export { signUp, requestOtp, resetPassword, landingPage ,login,registerSeminar,getUserRegistration,getFormData,updateFormData,Status};
 