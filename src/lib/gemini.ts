import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('Missing Gemini API key. Please add VITE_GEMINI_API_KEY to your .env file.');
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export const getDonationSuggestions = async (description: string) => {
  try {
    const prompt = `As a donation advisor, analyze this situation and provide specific suggestions:
      "${description}"
      
      Please provide:
      1. Most needed items
      2. Potential impact
      3. Additional recommendations
      
      Format the response in JSON with these keys: items (array), impact (string), recommendations (array)`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('Error getting donation suggestions:', error);
    throw error;
  }
};

export const assessImpact = async (donations: any[]) => {
  try {
    const prompt = `As an impact assessment expert, analyze these donations:
      ${JSON.stringify(donations)}
      
      Please provide:
      1. Total estimated impact
      2. Communities benefited
      3. Suggestions for increasing impact
      
      Format the response in JSON with these keys: impact (string), communities (array), suggestions (array)`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('Error assessing impact:', error);
    throw error;
  }
};