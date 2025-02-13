import mongoose from "mongoose";
import SeminarRegistration from "../models/registerModel.js";

const getUserTable = async (req, res) => {
  try {
    // Fetch all seminar registrations
    const getData = await SeminarRegistration.find().populate("userId", "name email");

    // Transform the data into an array of objects
    const userDataArray = getData.map((registration) => ({
      _id: registration.userId || "h",
      img: registration.image1 || "h",
      name: registration.userId?.name || "h",
      org: registration.age || "h", 
      job: registration.gender || "h",
      email: registration.userId?.email ||"h",
      date: registration.address?.country ||"h",
      online: registration.approvalStatus ? "Approved" : registration.applicationStatus || "h",
    }));

    res.status(200).json({ userData: userDataArray });
     
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const Accept = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Convert userId to ObjectId
        const objectId = new mongoose.Types.ObjectId(userId);

        // Update the seminar registration status
        const updatedRegistration = await SeminarRegistration.findOneAndUpdate(
            { userId: objectId }, // Search by userId
            { $set: { applicationStatus: "accepted" } }, // Update applicationStatus
            { new: true } // Return updated document
        );

        if (!updatedRegistration) {
            return res.status(404).json({ error: "Registration not found" });
        }

        res.status(200).json({ message: "Application accepted", registration: updatedRegistration });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};


const Reject = async (req, res) => {
    try {
        const { userId, reason } = req.body;

        if (!userId || !reason) {
            return res.status(400).json({ error: "User ID and rejection reason are required" });
        }

        // Convert userId to ObjectId
        const objectId = new mongoose.Types.ObjectId(userId);

        // Update the seminar registration status and store the rejection reason
        const updatedRegistration = await SeminarRegistration.findOneAndUpdate(
            { userId: objectId }, // Search by userId
            { $set: { applicationStatus: "rejected", reason: reason } }, // Update status and add reason
            { new: true } // Return updated document
        );

        if (!updatedRegistration) {
            return res.status(404).json({ error: "Registration not found" });
        }

        res.status(200).json({ message: "Application rejected", registration: updatedRegistration });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};



export { getUserTable,Accept,Reject };
