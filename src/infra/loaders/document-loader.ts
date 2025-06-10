
import path from "node:path";

import { TokenTextSplitter } from "langchain/text_splitter";
import { PineconeProvider } from "../providers/pinecone.ts";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";

export class DocumentLoader {
    protected splitter = new TokenTextSplitter({
        encodingName: "cl100k_base",
        chunkSize: 600,
        chunkOverlap: 0,
    });

    async loadAndStore({ filePath, indexName }: {
        filePath: string;
        indexName: string;
    }): Promise<void> {

        const loader = new DirectoryLoader(
            path.resolve(process.cwd(), filePath),
            {
                ".pdf": (filePath) => new PDFLoader(filePath),
                ".txt": (filePath) => new TextLoader(filePath),
            }
        );

        const documents = await loader.load()

        const chunks = await this.splitter.splitDocuments(documents);

        const vectorStore = await PineconeProvider.getVectorStore(indexName);

        await vectorStore.addDocuments(chunks);

        console.log(`Loaded ${chunks.length} chunks from ${filePath}`);
    }
}