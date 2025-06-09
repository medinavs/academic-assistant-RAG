import type { FastifyInstance } from 'fastify'
import { Answer } from './answer/answer'

export async function routes(app: FastifyInstance) {
    app.register(Answer)
}