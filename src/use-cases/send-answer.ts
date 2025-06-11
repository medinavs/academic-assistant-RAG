import { ChatOpenAI } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { PromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";

interface SendAnswerUseCaseRequest {
    message: string;
}

interface SendAnswerUseCaseResponse {
    answer: string;
}

export class SendAnswerUseCase {
    constructor(
        private readonly model: ChatOpenAI,
        private readonly pineconeVectorStore: PineconeStore,
    ) { }

    async execute({
        message
    }: SendAnswerUseCaseRequest): Promise<SendAnswerUseCaseResponse> {

        if (!message) {
            throw new Error("Message is required");
        }

        const prompt = new PromptTemplate({
            template: `
                Você é um assistente de professores e alunos, que ajuda a responder perguntas sobre o conteúdo das disciplinas da escola.
                Você deve responder de forma clara e objetiva, sem rodeios, e sempre com base no conteúdo da aula.
                Se a resposta não estiver no conteúdo responda que não sabe, não invente respostas.
                
                conteúdo: {context}

                Pergunta: {input}
            `.trim(),
            inputVariables: ["context", "input"],
        })

        const documentChain = await createStuffDocumentsChain({
            llm: this.model,
            prompt,
        });

        const retrievalChain = await createRetrievalChain({
            combineDocsChain: documentChain,
            retriever: this.pineconeVectorStore.asRetriever(),
        });

        const result = await retrievalChain.invoke({
            input: message,
        });

        return {
            answer: result.answer,
        }
    }
}