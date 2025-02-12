import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Payment from "../models/paymentModel.js";
import mongoose from "mongoose";

const createOrder= async (req, res) => {

  try {
    
    const options = {
      
      amount: req.body.amount * 100, // Convert to paisa
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };
   const {userId}=req.body

    const order = await razorpay.orders.create(options);
    res.status(200).json({ order });
    console.log(order)
 
    const paymentDetails = new Payment({
        userId:userId,
        amount:order.amount,
        status:"pending",
        transactionId:order.id,
        date:new Date()


    })
    await paymentDetails.save()
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature,userId } = req.body;
  console.log(userId)
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.json({ success: true, message: "Payment verified successfully" });
    
   const updatedPayment = await Payment.findByIdAndUpdate( new mongoose.Types.ObjectId(userId), { $set: { status: "done" } }, { new: true });
    console.log("Updated Payment:", updatedPayment);  
} else {
    res.status(400).json({ success: false, message: "Invalid payment signature" });
    await Payment.findByIdAndUpdate( new mongoose.Types.ObjectId(userId), { $set: { status: "failed" } }, { new: true });
  }
};


export  {createOrder,verifyPayment}