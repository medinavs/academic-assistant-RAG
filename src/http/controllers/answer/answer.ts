import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { makeAnswerUseCase } from "../../../use-cases/factories/make-send-answer-use-case";

export async function Answer(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/message', {
        schema: {
            body: z.object({
                message: z.string().describe('The message to send'),
            }),
            response: {
                200: z.object({
                    answer: z.string().describe('The answer to the message'),
                }),
            }
        }
    }, async (request, reply) => {
        const { message } = request.body as { message: string };

        const sendAnswerUseCase = await makeAnswerUseCase();

        const response = await sendAnswerUseCase.execute({
            message,
        });

        return reply.status(200).send(response);
    });
}