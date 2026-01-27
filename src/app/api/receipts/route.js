import connectDB from "@/lib/db";
import Receipt from "@/models/Receipt";
import { NextResponse } from "next/server";

// GET Request for showing all receipts
export async function GET() {
  try {
    await connectDB();

    // receive data with Mongoose
    const receipts = await Receipt.find({}).sort({ createdAt: -1 }).limit(50);

    return NextResponse.json({ success: true, data: receipts });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}

// POST Request for creating a new receipt
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // 1. validation
    if (!body.clientName || !body.amount) {
      return NextResponse.json(
        { error: "Client Name and Amount are required" },
        { status: 400 },
      );
    }
    // 2. Generate Receipt No (Logic: RNP + Date + Random 3 digits)
    const today = new Date();
    const dateStr = today.toISOString().slice(2, 10).replace(/-/g, "");
    const randomNum = Math.floor(100 + Math.random() * 900);
    const receiptNo = `RNP-${dateStr}${randomNum}`;

    // 3. save data with mongoose
    const newReceipt = await Receipt.create({
      ...body,
      receiptNo,
    });

    return NextResponse.json({
      success: true,
      id: newReceipt._id,
      receiptNo: newReceipt.receiptNo,
    });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to save receipt" },
      { status: 500 },
    );
  }
}
