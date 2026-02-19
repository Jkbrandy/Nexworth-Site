
import { GoogleGenAI } from "@google/genai";

// Use gemini-3-flash-preview for summarization and marketing tasks
export const getOfferInsights = async (offerTitle: string, offerDescription: string) => {
  try {
    // Initializing with process.env.API_KEY directly as required
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a 1-sentence marketing pitch for a youth discount offer: ${offerTitle} - ${offerDescription}. Make it sound modern and empowering.`,
    });
    // response.text is a getter, do not call as a function
    return response.text || "Exclusive opportunity for Nexworth members.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Empowering your future with better access to essentials.";
  }
};

export const getAdminAnalyticsSummary = async (stats: any) => {
  try {
    // Initializing with process.env.API_KEY directly as required
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize these platform statistics for an admin dashboard: ${JSON.stringify(stats)}. Highlight one positive trend and one area for improvement.`,
    });
    // response.text is a getter, do not call as a function
    return response.text || "Growth is steady across all categories this month.";
  } catch (error) {
    console.error("Gemini Analytics Error:", error);
    return "Growth is steady across all categories this month.";
  }
};
