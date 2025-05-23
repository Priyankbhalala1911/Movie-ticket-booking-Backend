import razorpay from "razorpay";

export const RazorPatInstance = () => {
  const instance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });

  return instance;
};
