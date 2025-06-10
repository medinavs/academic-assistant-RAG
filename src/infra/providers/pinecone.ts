import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";

export class PineconeProvider {
    private static clientInstance: PineconeClient | null = null;
    private static storeInstance: PineconeStore | null = null;

    public static getClient(): PineconeClient {
        if (!PineconeProvider.clientInstance) {
            PineconeProvider.clientInstance = new PineconeClient({
                apiKey: process.env.PINECONE_API_KEY!,
            });
        }

        return PineconeProvider.clientInstance;
    }

    public static async getVectorStore(indexName: string = 'default'): Promise<PineconeStore> {
        if (!PineconeProvider.storeInstance) {
            const client = PineconeProvider.getClient();
            const pineconeIndex = client.index(indexName);

            const embeddings = new OpenAIEmbeddings({
                openAIApiKey: process.env.OPENAI_API_KEY!,
            });

            PineconeProvider.storeInstance = new PineconeStore(embeddings, {
                pineconeIndex,
                maxConcurrency: 5,
            });
        }

        return PineconeProvider.storeInstance;
    }

    public static async createVectorStore(indexName: string, embeddings?: OpenAIEmbeddings): Promise<PineconeStore> {
        const client = PineconeProvider.getClient();
        const pineconeIndex = client.index(indexName);

        const embeddingsInstance = embeddings || new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY!,
        });

        return new PineconeStore(embeddingsInstance, {
            pineconeIndex,
            maxConcurrency: 5,
        });
    }
}