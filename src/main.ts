import Fastify from 'fastify';
import { app } from './app/app';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3333;

// Instantiate Fastify with some config
const server = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
server.register(app);

// Start listening.
server.listen({ port, host }, async (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    await prisma.$connect();
    console.log(`😊 Successfully connected to DB`)
	  console.log(`⚡️ Server is running at port ${port}`);
  }
});
