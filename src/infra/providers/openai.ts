import { ChatOpenAI } from "@langchain/openai";

export class OpenAIProvider {
    private static instance: ChatOpenAI;

    private constructor() { }

    static getInstance(): ChatOpenAI {
        if (!OpenAIProvider.instance) {
            OpenAIProvider.instance = new ChatOpenAI({
                model: "gpt-4o-mini",
                openAIApiKey: process.env.OPENAI_API_KEY,
                temperature: 0.3,
            });
        }

        return OpenAIProvider.instance;
    }

    static resetInstance(): void {
        OpenAIProvider.instance = null as any;
    }
}