import { generateText } from "ai";
import type { openai as openaiModel } from '@ai-sdk/openai';


interface SendAnswerUseCaseRequest {
    message: string;
}

interface SendAnswerUseCaseResponse {
}

export class SendAnswerUseCase {
    constructor(
        private readonly openai: ReturnType<typeof openaiModel>
    ) { }

    async execute({
        message
    }: SendAnswerUseCaseRequest): Promise<SendAnswerUseCaseResponse> {
        const answer = await generateText({
            model: this.openai,
            prompt: message,
            system: "you only answer 'i dont know'"
        });

        return {
            answer: answer.text,
        }
    }
}