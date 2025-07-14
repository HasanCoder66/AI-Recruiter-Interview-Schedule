// // services/openai.js
// import OpenAI from "openai";
// import dotenv from "dotenv";
// dotenv.config();

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export const generateWithOpenAI = async (prompt) => {
//   const response = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: prompt }],
//     temperature: 0.7,
//   });

//   const raw = response.choices[0].message.content;

//   // Split lines into separate questions
//   const questions = raw
//     .split("\n")
//     .map(q => q.trim())
//     .filter(q => q.length > 0);

//   return questions;
// };