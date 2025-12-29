import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedMelody, NoteName } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMelody = async (mood: string): Promise<GeneratedMelody> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Compose a simple melody for a single-octave piano based on the mood: "${mood}".
      The available notes are: C, C#, D, D#, E, F, F#, G, G#, A, A#, B, C5.
      The melody should be between 8 and 16 notes long.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A creative title for the melody" },
            notes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of note names (e.g., 'C', 'D#', 'A')"
            },
            description: { type: Type.STRING, description: "A short explanation of why this fits the mood" }
          },
          required: ["title", "notes", "description"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedMelody;
    }
    throw new Error("Empty response from Gemini");

  } catch (error) {
    console.error("Error generating melody:", error);
    // Fallback in case of API error
    return {
      title: "Fallback Tune",
      notes: ["C", "E", "G", "C5", "G", "E", "C"] as NoteName[],
      description: "A simple arpeggio (API might be unavailable)."
    };
  }
};
