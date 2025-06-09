import awsLambdaFastify from "@fastify/aws-lambda";
import type {
    APIGatewayProxyEventV2WithRequestContext,
    Context,
} from "aws-lambda";
import { app } from "./app";

const proxy = awsLambdaFastify(app);

console.log("Serverless function started!");

export const main = async (
    event: APIGatewayProxyEventV2WithRequestContext<{ http: { path: string } }>,
    context: Context
) => {
    await app.ready();

    const response = await proxy(event, context);

    response.headers = {
        ...response.headers,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
    };

    return response;
};