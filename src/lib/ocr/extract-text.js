/**
 * OCR Text Extraction Utility (SERVER-SIDE ONLY)
 *
 * Strategy: pdf-parse → Tesseract.js → Gemini Flash API (fallback)
 *
 * IMPORTANT: This file should NEVER be imported in Client Components.
 * Use 'use server' directive to enforce server-side execution.
 *
 * @module lib/ocr/extract-text
 */

"use server";

/**
 * Extract text from PDF buffer using pdf-parse
 * @param {Buffer} buffer - PDF file buffer
 * @returns {Promise<{success: boolean, text: string, error?: string}>}
 */
export async function extractTextFromPDF(buffer) {
  try {
    // TODO: Implement pdf-parse extraction
    // const pdfParse = require('pdf-parse');
    // const data = await pdfParse(buffer);
    // return { success: true, text: data.text };

    return {
      success: false,
      text: "",
      error: "PDF extraction not yet implemented (Phase 1 scaffold)",
    };
  } catch (error) {
    console.error("PDF extraction error:", error);
    return {
      success: false,
      text: "",
      error: error.message,
    };
  }
}

/**
 * Extract text from image buffer using Tesseract.js
 * @param {Buffer} buffer - Image file buffer
 * @returns {Promise<{success: boolean, text: string, confidence?: number, error?: string}>}
 */
export async function extractTextFromImage(buffer) {
  try {
    // TODO: Implement Tesseract.js extraction
    // const Tesseract = require('tesseract.js');
    // const { data } = await Tesseract.recognize(buffer, 'eng');
    // return { success: true, text: data.text, confidence: data.confidence };

    return {
      success: false,
      text: "",
      error: "Image OCR not yet implemented (Phase 1 scaffold)",
    };
  } catch (error) {
    console.error("Image OCR error:", error);
    return {
      success: false,
      text: "",
      error: error.message,
    };
  }
}

/**
 * Fallback: Use Gemini Flash API for blurry/handwritten receipts
 * @param {Buffer} buffer - Image file buffer
 * @param {string} mimeType - Image MIME type (e.g., 'image/jpeg')
 * @returns {Promise<{success: boolean, text: string, error?: string}>}
 */
export async function extractTextWithGemini(buffer, mimeType) {
  try {
    // TODO: Implement Gemini Vision API extraction
    // const { GoogleGenerativeAI } = require('@google/generative-ai');
    // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    // ...

    return {
      success: false,
      text: "",
      error: "Gemini API extraction not yet implemented (Phase 1 scaffold)",
    };
  } catch (error) {
    console.error("Gemini API error:", error);
    return {
      success: false,
      text: "",
      error: error.message,
    };
  }
}

/**
 * Universal OCR function with automatic fallback strategy
 * @param {Buffer} buffer - File buffer
 * @param {string} fileType - File MIME type or extension
 * @returns {Promise<{success: boolean, text: string, method?: string, error?: string}>}
 */
export async function extractText(buffer, fileType) {
  // TODO: Phase 2 - Implement smart detection and fallback logic
  // 1. If PDF → use extractTextFromPDF()
  // 2. If image → use extractTextFromImage()
  // 3. If low confidence → fallback to extractTextWithGemini()

  return {
    success: false,
    text: "",
    error: "Universal OCR not yet implemented (Phase 1 scaffold)",
  };
}
