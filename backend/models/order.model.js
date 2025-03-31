import mongoose from "mongoose";

// Remove the unnecessary import of `type` from 'os'
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerName: {
      type: String,
    },
    email: { type: String },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productName: {
          type: String,
          // required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      default: "new",
      enum: ["new", "processing", "delivering", "delivered"],
    },
    // paystackReference: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
