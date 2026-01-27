// Models/Schema for Receipt
import mongoose from "mongoose";

const ReceiptSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    paymentMode: {
      type: String,
      enum: ["Cash", "Cheque", "Bank Transfer", "Pay Order"],
      default: "Cash",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    purpose: {
      type: String,
      trim: true,
    },
    receiptNo: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      default: "verified",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Receipt ||
  mongoose.model("Receipt", ReceiptSchema);
