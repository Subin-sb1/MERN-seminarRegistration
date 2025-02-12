import mongoose from "mongoose";

const seminarRegistrationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mobileNumber: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    institution: { type: String, required: true },
    role: { type: String, enum: ["Faculty", "Student"], required: true },
    address: {
      country: { type: String, required: true },
      state: { type: String, required: true },
      district: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    accommodation: { type: Boolean, default: false },
    applicationStatus: { type: String, enum: ["pending", "accepted", "rejected",], default: "pending" },
    image1: { type: String, required: true },
    date: { type: Date, default: Date.now },
    approvalStatus: { type: Boolean, default: false },
    reason: { type: String, required: true },
  },
  { timestamps: true }
);

const SeminarRegistration = mongoose.model("SeminarRegistration", seminarRegistrationSchema);
export default SeminarRegistration;
