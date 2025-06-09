import { OpenAIProvider } from "../../infra/providers/openai"
import { SendAnswerUseCase } from "../send-answer"

export function makeAnswerUseCase() {
    const openai = OpenAIProvider.getInstance();

    const useCase = new SendAnswerUseCase(openai)

    return useCase
}