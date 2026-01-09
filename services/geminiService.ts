import { GoogleGenAI } from "@google/genai";
import { AppMode } from "../types";
import { ANCURE_SYSTEM_PROMPT } from "../constants";

// Initialize Ancure AI Client
// We assume process.env.API_KEY is available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * Converts a File object to a Base64 string suitable for the API.
 */
const fileToPart = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
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

export const analyzeMedicalDocument = async (file: File, mode: AppMode): Promise<string> => {
  try {
    const base64Data = await fileToPart(file);
    
    // Explicitly instruct the model which mode to use based on user selection
    const userPrompt = `
      Please analyze this image.
      The user has selected: ${mode === AppMode.PRESCRIPTION ? 'A) Prescription Explanation Mode' : 'B) Medical Report Explanation Mode'}.
      Follow the system instructions for this mode strictly.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash', // Using Ancure AI high-performance model
      contents: {
        parts: [
          {
            text: userPrompt
          },
          {
            inlineData: {
              mimeType: file.type,
              data: base64Data
            }
          }
        ]
      },
      config: {
        systemInstruction: ANCURE_SYSTEM_PROMPT,
        temperature: 0.4, // Lower temperature for more deterministic/factual output
      }
    });

    return response.text || "I could not generate a response. Please try again.";

  } catch (error: any) {
    console.error("Ancure AI Service Error:", error);
    if (error.message?.includes("API_KEY")) {
      throw new Error("Invalid or missing API Key.");
    }
    throw new Error("Failed to analyze the document. Please ensure the image is clear and try again.");
  }
};