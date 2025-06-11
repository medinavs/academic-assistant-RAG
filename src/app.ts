import { fastify } from 'fastify';
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { routes } from './http/controllers/routes';

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.addHook('preHandler', async (request, reply) => {
    console.log(`${request.method} ${request.url} - ${new Date().toISOString()}`);
});

app.register(routes)

// @TODO make a middleware to auth requests

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "semantic-search-api",
            version: "1.0.0",
        },
    },
});
app.register(fastifySwaggerUi, {
    routePrefix: "/documentation",
});