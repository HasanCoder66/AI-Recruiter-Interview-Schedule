// // services/gemini.js
// import dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export const generateWithGemini = async (prompt) => {
//   try {
//     // const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp",
//     //      systemInstruction: `You are an AI Interviewer. Your task is to analyze job descriptions and generate structured job posting data. Always return data in the following JSON format with all fields:`
//     //  });

//     const model = genAI.getGenerativeModel({
//       model: "models/gemini-2.0-flash-exp",
//       systemInstruction: `
// You are a professional AI Interviewer assistant.

// Your job is to analyze job titles, job descriptions, and interview types, and generate 10 relevant, creative, and challenging interview questions.

// Each question must be based on the job context and role expectations.

// Respond only with a JSON array in the following format:
// [
//   "Question 1?",
//   "Question 2?",
//   "Question 3?",
//   "Question 4?",
//   "Question 5?",
//   "Question 6?",
//   "Question 7?",
//   "Question 8?",
//   "Question 9?",
//   "Question 10?"
// ]

// Do not return explanations, labels, markdown, or any surrounding text — only raw JSON array.
// `,
//     });

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const raw = response.text();

//     // const questions = raw
//     //   .split("\n")
//     //   .map((q) => q.trim())
//     //   .filter((q) => q.length > 0);
//     const questions = JSON.parse(text); // ✅ now it's a clean JSON array
//     if (!Array.isArray(questions) || questions.length === 0) {
//       throw new Error("No questions generated or invalid format.");
//     }

//     return questions;
//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     throw new Error("Failed to generate questions from Gemini");
//   }
// };

















// import dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export const generateWithGemini = async (prompt) => {
//   try {
//     const model = genAI.getGenerativeModel({
//       model: "models/gemini-2.0-flash-exp",
//       systemInstruction: `
// You are a professional AI Interviewer assistant.

// Your job is to analyze job titles, job descriptions, and interview types, and generate 10 relevant, creative, and challenging interview questions.

// Each question must be based on the job context and role expectations.

// Respond only with a JSON array in the following format:
// [
//   "Question 1?",
//   "Question 2?",
//   "Question 3?",
//   "Question 4?",
//   "Question 5?",
//   "Question 6?",
//   "Question 7?",
//   "Question 8?",
//   "Question 9?",
//   "Question 10?"
// ]

// Do not return explanations, labels, markdown, or any surrounding text — only raw JSON array.
//       `,
//     });

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text(); // ✅ Renamed from raw → text

//     const questions = JSON.parse(text); // ✅ this now works
//     if (!Array.isArray(questions) || questions.length === 0) {
//       throw new Error("No questions generated or invalid format.");
//     }

//     return questions;
//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     throw new Error("Failed to generate questions from Gemini");
//   }
// };



























// services/gemini.js
// import dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export const generateWithGemini = async (prompt) => {
//   try {
//     const model = genAI.getGenerativeModel({
//       model: "models/gemini-2.0-flash-exp",
//       systemInstruction: `
// You are a professional AI Interviewer assistant.

// Your job is to analyze job titles, job descriptions, and interview types, and generate 10 relevant, creative, and challenging interview questions.

// Each question must be based on the job context and role expectations.

// Respond only with a JSON array in the following format:
// [
//   "Question 1?",
//   "Question 2?",
//   "Question 3?",
//   "Question 4?",
//   "Question 5?",
//   "Question 6?",
//   "Question 7?",
//   "Question 8?",
//   "Question 9?",
//   "Question 10?"
// ]

// Do not return explanations, labels, markdown, or any surrounding text — only raw JSON array.
//       `,
//     });

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = await response.text(); // ✅ Awaited because .text() is async in some environments

//     let questions;
//     try {
//       questions = JSON.parse(text);
//     } catch (parseErr) {
//       console.error("JSON Parse Error:", parseErr);
//       throw new Error("Invalid response format from Gemini. Expected JSON array.");
//     }

//     if (!Array.isArray(questions) || questions.length === 0) {
//       throw new Error("No questions generated or invalid format.");
//     }

//     return questions;
//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     throw new Error("Failed to generate questions from Gemini");
//   }
// };


























// services/googleGenerativeai.js
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateWithGemini = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.0-flash-exp",
      systemInstruction: `
You are a professional AI Interviewer assistant.

Your job is to analyze job titles, job descriptions, and interview types, and generate 10 relevant, creative, and challenging interview questions.

Respond ONLY with a JSON array of questions — no explanations, no markdown, just the array.
      `,
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = await response.text();

    // 🔥 Clean markdown formatting if present
    const cleaned = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let questions;

    try {
      questions = JSON.parse(cleaned);
    } catch (err) {
      console.error("JSON Parse Error:", err);
      console.log("Raw Gemini Response:", rawText); // Optional: for debugging
      throw new Error("Invalid response format from Gemini. Expected JSON array.");
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("No questions generated or invalid format.");
    }

    return questions;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate questions from Gemini");
  }
};