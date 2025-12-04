import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Message, Role } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

// Initialize the client. 
// note: process.env.API_KEY is expected to be available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Creates a new chat session with the specific campus context.
 */
export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      // Enable Google Search for real-time world info (e.g., "When is the next real holiday?")
      // or to ground campus info if NTU was a real place with a website.
      tools: [{ googleSearch: {} }], 
    },
  });
};

/**
 * Sends a message to the model and yields chunks of text as they arrive.
 */
export async function* sendMessageStream(
  chat: Chat, 
  message: string
): AsyncGenerator<{ text: string; groundingUrls?: string[] }, void, unknown> {
  
  try {
    const resultStream = await chat.sendMessageStream({ message });

    for await (const chunk of resultStream) {
      const c = chunk as GenerateContentResponse;
      
      // Extract text
      const text = c.text || "";
      
      // Extract grounding metadata if present (URLs)
      let groundingUrls: string[] | undefined;
      const chunks = c.candidates?.[0]?.groundingMetadata?.groundingChunks;
      
      if (chunks) {
        groundingUrls = chunks
          .map(ch => ch.web?.uri)
          .filter((uri): uri is string => !!uri);
      }

      yield { text, groundingUrls };
    }
  } catch (error) {
    console.error("Error in geminiService:", error);
    yield { text: "\n\n*[System Error: Unable to connect to Nova Assistant at this moment.]*" };
  }
}
