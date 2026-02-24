import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const generateAIResponse = async ({
  systemContext,
  messages,
}) => {
  const result = await generateText({
    model: google("gemini-2.5-flash"),
    system: systemContext,
    messages,
  });

  return result.text;
};