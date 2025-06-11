import { OpenAIProvider } from "../../infra/providers/openai";
import { PineconeProvider } from "../../infra/providers/pinecone";
import { SendAnswerUseCase } from "../send-answer"
import { ChatOpenAI } from "@langchain/openai";

export async function makeAnswerUseCase() {
    const openai = OpenAIProvider.getInstance()
    const pineconeStore = await PineconeProvider.getVectorStore()

    const useCase = new SendAnswerUseCase(openai, pineconeStore)

    return useCase
}