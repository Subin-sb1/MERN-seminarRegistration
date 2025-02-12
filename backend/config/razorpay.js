import Razorpay from "razorpay"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
async function checkRazorpayConnection() {
    try {
      const response = await razorpay.orders.all({ limit: 1 }); // Fetch a small order list
      console.log("✅ Razorpay connection successfully:");
    } catch (error) {
      console.error("❌ Razorpay connection failed:", error);
    }
  }
  
  // Call the function when initializing
  checkRazorpayConnection();
export default  razorpay;
