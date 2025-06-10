import { DocumentLoader } from "../infra/loaders/document-loader.ts"

async function main() {
    try {
        console.log("loading documents...")

        const loader = new DocumentLoader()

        await loader.loadAndStore({ filePath: "documents", indexName: "students-docs" })

        console.log("documents loaded successfully!!!")

    } catch (error) {
        console.error("error on loading documents:", error)
        process.exit(1)
    }
}

main()