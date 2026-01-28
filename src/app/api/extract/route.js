// app/api/extract/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini AI with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    // 1. Get image data from the request form
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }

    // 2. Convert file to bytes/buffer for Gemini
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 3. Define the specific AI model (Gemini 1.5 Flash is fast and cheap)
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // 4. Construct the prompt for the AI
    const prompt = `
      Extract the following information from this receipt, cheque, or document image and return ONLY a JSON object. 
      Do not include markdown formatting like \`\`\`json or \`\`\`. Just the raw JSON string.
      
      Fields required:
      - clientName: (Who paid the money? Extract person or company name)
      - amount: (Total amount in numeric format, e.g., 5000. Remove symbols like commas or currency signs)
      - paymentMode: (Cash, Cheque, Bank Transfer, or Pay Order. Default to "Cash" if unclear)
      - date: (Date of transaction in YYYY-MM-DD format. If not found, use today's date)
      - purpose: (Reason for payment, e.g., Insurance Premium, Bill, Rent. Keep it short)
      - bankName: (If it is a cheque, extract bank name. Otherwise null)
      - chequeNo: (If it is a cheque, extract cheque number. Otherwise null)
      - policyNo: (If any policy number or reference number is visible, extract it. Otherwise null)

      If any field is missing or unreadable, put null.
    `;

    // 5. Send image and prompt to Gemini
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: buffer.toString("base64"),
          mimeType: file.type,
        },
      },
    ]);

    const response = result.response;
    const text = response.text();

    // 6. Clean and parse the response
    // Sometimes AI adds markdown code blocks, we strip them to be safe
    const cleanText = text.replace(/```json|```/g, "").trim();

    let extractedData;
    try {
      extractedData = JSON.parse(cleanText);
    } catch (e) {
      console.error("JSON Parse Error:", cleanText);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data: extractedData });
  } catch (error) {
    console.error("AI Extraction Error:", error);
    return NextResponse.json(
      { error: "Failed to extract data" },
      { status: 500 },
    );
  }
}
