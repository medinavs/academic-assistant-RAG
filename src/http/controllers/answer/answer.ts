import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { makeAnswerUseCase } from "../../../use-cases/factories/make-send-answer-use-case";

export async function Answer(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/message', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        description: 'The message to send',
                    }
                },
                required: ['message']
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        answer: {
                            type: 'string',
                            description: 'The answer to the message',
                        },
                    },
                }
            }
        }
    }, async (request, reply) => {
        const { message } = request.body as { message: string };

        const sendAnswerUseCase = makeAnswerUseCase();

        const response = await sendAnswerUseCase.execute({
            message,
        });

        return reply.status(200).send(response);
    });
}