import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// 1. Read .env.local manually to get the key
const envPath = path.resolve(process.cwd(), ".env.local");
let apiKey = "";

try {
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    const match = envContent.match(/GEMINI_API_KEY=(.+)/);
    if (match && match[1]) {
      apiKey = match[1].trim();
    }
  }
} catch (e) {
  console.error("Error reading .env.local:", e);
}

if (!apiKey) {
  console.error("❌ Could not find GEMINI_API_KEY in .env.local");
  process.exit(1);
}

console.log("✅ Found API Key.");

// 2. Initialize Gemini
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Placeholder init
    // Actually the SDK doesn't expose listModels directly on the main class easily in all versions?
    // Wait, typically it's specific manager. Let's try to just generateContent with 'gemini-pro' as a fallback test
    // OR, better, use the correct internal mechanism if public.

    // Actually, SDK doesn't always have listModels helper.
    // Let's try a few known models and see which one doesn't throw 404 immediately/check validity.
    // OR better, just try to hit the API using fetch if SDK is opaque.

    const baseUrl = "https://generativelanguage.googleapis.com/v1beta/models";
    const response = await fetch(`${baseUrl}?key=${apiKey}`);
    const data = await response.json();

    if (data.models) {
      console.log("\n📦 Available Models:");
      data.models.forEach((m) => {
        if (m.supportedGenerationMethods.includes("generateContent")) {
          console.log(` - ${m.name} (${m.displayName})`);
        }
      });
    } else {
      console.error("❌ Failed to list models:", data);
    }
  } catch (error) {
    console.error("❌ Error listing models:", error);
  }
}

listModels();
