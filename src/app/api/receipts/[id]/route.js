import connectDB from "@/lib/db";
import Receipt from "@/models/Receipt";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const receipt = await Receipt.findById(id);

    if (!receipt) {
      return NextResponse.json({ error: "Receipt not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: receipt });
  } catch (error) {
    console.error("Fetch Single Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
