import { OpenAIProvider } from "../../infra/providers/openai";
import { PineconeProvider } from "../../infra/providers/pinecone";
import { SendAnswerUseCase } from "../send-answer"

export async function makeAnswerUseCase() {
    const openai = OpenAIProvider.getInstance()
    const pineconeStore = await PineconeProvider.getVectorStore('students-docs')

    const useCase = new SendAnswerUseCase(openai, pineconeStore)

    return useCase
}