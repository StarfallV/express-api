import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

const route = 'article';

export default async function (fastify: FastifyInstance) {
  fastify.get(
    `/${route}/`,
    async function (request: FastifyRequest, reply: FastifyReply) {
      return { message: 'Hello Route' };
    }
  );
}
