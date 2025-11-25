import { GoogleGenAI } from "@google/genai";
import { PROJECT_CONTEXT } from "../constants";

let aiClient: GoogleGenAI | null = null;

export const initGenAI = () => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing in environment variables.");
    return;
  }
  aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
  if (!aiClient) {
    initGenAI();
    if (!aiClient) return "Error: API Key not configured.";
  }

  try {
    const model = aiClient!.models;
    const response = await model.generateContent({
      model: "gemini-2.5-flash",
      contents: userMessage,
      config: {
        systemInstruction: PROJECT_CONTEXT,
      },
    });
    
    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error communicating with the AI service.";
  }
};
