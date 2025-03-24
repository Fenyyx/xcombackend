import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Falta la API Key de Gemini en las variables de entorno.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateResponse(context, question) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Usa la siguiente información para responder la pregunta:
      Información de la base de datos:
      ${context.trim()}

      Pregunta: ${question.trim()}
    `;

    const result = await model.generateContent(prompt);
    
    if (!result || !result.response) {
      throw new Error("Respuesta inválida de Gemini.");
    }

    return result.response.text();
  } catch (error) {
    console.error("Error al generar respuesta con Gemini:", error);
    throw new Error("Error al procesar la pregunta.");
  }
}

export default generateResponse;
