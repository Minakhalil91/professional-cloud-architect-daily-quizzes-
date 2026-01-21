
import { GoogleGenAI, Type } from "@google/genai";
import { PCAQuestion, PCASection } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    topic: { type: Type.STRING },
    section: { type: Type.STRING },
    caseStudy: { type: Type.STRING, nullable: true },
    scenario: { type: Type.STRING },
    options: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          text: { type: Type.STRING }
        },
        required: ["id", "text"]
      }
    },
    correctOptionId: { type: Type.STRING },
    explanation: { type: Type.STRING },
    difficulty: { type: Type.STRING }
  },
  required: ["topic", "section", "scenario", "options", "correctOptionId", "explanation", "difficulty"]
};

export const generatePCAQuestion = async (selectedCaseStudy?: string): Promise<PCAQuestion> => {
  const prompt = `
    Act as a Senior Google Cloud Solutions Architect and Exam Content Developer for the Professional Cloud Architect (PCA) certification.
    Generate a challenging, high-quality exam practice question.
    
    ${selectedCaseStudy ? `Focus specifically on the "${selectedCaseStudy}" case study.` : "You may use one of the standard PCA case studies (Mountkirk Games, TerramEarth, EHR Healthcare, Helicopter Racing League) or a general architectural scenario."}
    
    The question should:
    1. Be situational/scenario-based.
    2. Focus on Google Best Practices (Well-Architected Framework).
    3. Include 4 plausible options where only one is the absolute best recommendation according to Google Cloud documentation.
    4. Provide a detailed explanation of why the correct answer is right and why others are less optimal.
    
    Difficulty should be 'Professional' level.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });

    const result = JSON.parse(response.text);
    return {
      ...result,
      id: Math.random().toString(36).substr(2, 9),
    } as PCAQuestion;
  } catch (error) {
    console.error("Error generating question:", error);
    throw error;
  }
};
