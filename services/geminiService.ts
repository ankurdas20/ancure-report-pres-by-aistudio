import { GoogleGenAI } from "@google/genai";
import { AppMode, Language, AnalysisResponse } from "../types";
import { ANCURE_SYSTEM_PROMPT } from "../constants";

// Initialize Ancure AI Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const fileToPart = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const analyzeMedicalDocument = async (file: File, mode: AppMode, language: Language): Promise<AnalysisResponse> => {
  try {
    const base64Data = await fileToPart(file);
    
    const userPrompt = `
      Analyze this image in ${mode} mode.
      Target Language for Final Summary: ${language}.
      Return strictly valid JSON.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: {
        parts: [
          { text: userPrompt },
          { inlineData: { mimeType: file.type, data: base64Data } }
        ]
      },
      config: {
        systemInstruction: ANCURE_SYSTEM_PROMPT,
        temperature: 0.4,
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response generated");

    try {
      const jsonResponse = JSON.parse(text) as AnalysisResponse;
      return jsonResponse;
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      throw new Error("Failed to parse AI response. Please try again.");
    }

  } catch (error: any) {
    console.error("Ancure AI Service Error:", error);
    if (error.message?.includes("API_KEY")) {
      throw new Error("Invalid or missing API Key.");
    }
    throw new Error("Failed to analyze the document. Please ensure the image is clear and try again.");
  }
};