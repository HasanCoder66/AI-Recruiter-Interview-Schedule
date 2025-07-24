// // services/googleGenerativeai.js
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

// Respond ONLY with a JSON array of questions — no explanations, no markdown, just the array.
//       `,
//     });

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const rawText = await response.text();

//     // 🔥 Clean markdown formatting if present
//     const cleaned = rawText
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     let questions;

//     try {
//       questions = JSON.parse(cleaned);
//     } catch (err) {
//       console.error("JSON Parse Error:", err);
//       console.log("Raw Gemini Response:", rawText); // Optional: for debugging
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









// // services/googleGenerativeai.js
// import dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// /**
//  * Generate structured data using Gemini
//  * @param {string} prompt - The content to process
//  * @param {string} mode - "questions" or "feedback"
//  */
// export const generateWithGemini = async (prompt, mode = "questions") => {
//   try {
//     const systemInstruction =
//       mode === "questions"
//         ? `
// You are a professional AI Interviewer assistant.
// Your job is to analyze job titles, job descriptions, and interview types, and generate 10 relevant, creative, and challenging interview questions.
// Respond ONLY with a JSON array of questions — no explanations, no markdown, just the array.
// `
//         : `
// You are an AI recruiter assistant. Analyze the candidate's answers and create an evaluation.
// Respond ONLY with JSON in the format:
// {
//   "overallRating": number,
//   "skills": [
//     {"label":"Technical Skills","score":number},
//     {"label":"Problem Solving","score":number},
//     {"label":"Communication","score":number},
//     {"label":"Experience","score":number}
//   ],
//   "summary": "Short summary (max 3 sentences)",
//   "recommendation": "Recommended for Hire or Not Recommended",
//   "recommendationReason": "Explain why"
// }
// `;

//     const model = genAI.getGenerativeModel({
//       model: "models/gemini-2.0-flash-exp",
//       systemInstruction,
//     });

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const rawText = await response.text();

//     const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

//     let parsed;
//     try {
//       parsed = JSON.parse(cleaned);
//     } catch (err) {
//       console.error("JSON Parse Error:", err);
//       console.log("Raw Gemini Response:", rawText);
//       throw new Error("Invalid JSON response from Gemini");
//     }

//     return parsed;
//   } catch (error) {
//     console.error("Gemini API Error:", error.message);
//     throw new Error("Gemini request failed");
//   }
// };
























// services/googleGenerativeai.js
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * @param {string} prompt - The text prompt for Gemini
 * @param {"questions"|"feedback"} mode - Mode: generate questions or feedback
 */
export const generateWithGemini = async (prompt, mode = "questions") => {
  try {
    const systemInstruction =
      mode === "questions"
        ? `
You are a professional AI Interview Assistant.
Generate 10 relevant and challenging interview questions based on the job role and description.
Return ONLY a JSON array of questions (no extra text).
Example:
["What is React?", "Explain event loop in JavaScript"]
`
        : `
You are an expert recruiter and AI evaluator.
Analyze candidate answers and provide a structured JSON report in this exact format:
{
  "overallRating": 8.5,
  "skills": [
    { "label": "Technical Skills", "score": 9 },
    { "label": "Problem Solving", "score": 8 },
    { "label": "Communication", "score": 8.5 },
    { "label": "Experience", "score": 8 }
  ],
  "summary": "Candidate demonstrated strong technical proficiency and clear communication.",
  "recommendation": "Recommended for hire"
}
`;

    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.0-flash-exp",
      systemInstruction,
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = await response.text();

    const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error("JSON Parse Error:", err);
      console.log("Raw Gemini Response:", rawText);
      throw new Error(`Invalid JSON response from Gemini in ${mode} mode`);
    }

    return parsed;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(`Failed to generate ${mode} using Gemini`);
  }
};
