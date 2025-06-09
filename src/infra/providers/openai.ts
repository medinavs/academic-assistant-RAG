import { openai as openaiModel } from '@ai-sdk/openai'

export class OpenAIProvider {
    private static instance: ReturnType<typeof openaiModel> | null = null;

    public static getInstance(): ReturnType<typeof openaiModel> {
        if (!OpenAIProvider.instance) {
            OpenAIProvider.instance = openaiModel('gpt-4o')
        }

        return OpenAIProvider.instance
    }

    public static createModel(modelName: string = 'gpt-4o'): ReturnType<typeof openaiModel> {
        return openaiModel(modelName)
    }
}
