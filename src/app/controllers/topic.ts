import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from "@prisma/client";
import { HTTPStatus, PrismaError } from '../types';

const prisma: PrismaClient = new PrismaClient();

export async function getTopics(req: FastifyRequest, res: FastifyReply) {
    const query = req.query as any;
    const name = query["name"];

    try {
        const topics = await prisma.topic.findMany({
            where: {
                name: name !== undefined ? String(name) : undefined
            }
        })
        res.status(HTTPStatus.OK).send({
            message: 'All topics successfully fetched.',
            count: topics.length,
            data: { topics: topics }
        })

    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = HTTPStatus.INTERNAL_SERVER_ERROR;
        }
        res.status(err.statusCode).send(err);
    }
}

export async function getTopic(req: FastifyRequest, res: FastifyReply) {
    const params = req.params as any;
    const id = params["id"];

    try {
        const topic = await prisma.topic.findUnique({
            where: {
                id: +id
            }
        })     
        if (topic) {
            res.status(HTTPStatus.OK).send({
                message: `Topic with ID ${+id} successfully fetched.`,
                data: topic
            })
        } else {
            res.status(HTTPStatus.NOT_FOUND).send({
                message:  `Topic with ID ${+id} not found.`
            })
        }
       
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = HTTPStatus.INTERNAL_SERVER_ERROR;
        }
        res.status(err.statusCode).send(err);
    }
}

export async function createTopic(req: FastifyRequest, res: FastifyReply) {
    const data = req.body as any;

    try {
        const newTopic = await prisma.topic.create({
            data: {
                name: data.name,
            }
        });
        res.status(201).send({
            message: 'Topic successfully created.',
            data: newTopic
        });
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        res.status(err.statusCode).send(err);
    }

}

export async function updateTopic(req: FastifyRequest, res: FastifyReply) {
    const params = req.params as any;
    const id = params["id"];
    const data = req.body as any;

    try {
        const topic = await prisma.topic.update({
            data: {
                name: data.name,
            },
            where: {
                id: +id
            }
        });
        res.status(201).send({
            message: `Topic with ID ${+id} successfully updated.`,
            data: topic
        });
    } catch (err: any) {
        if (err.code === PrismaError.RECORD_NOT_FOUND) {
            err.statusCode = 404;
            err.message = `Topic with ID ${+id} not found.`;
        }
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        res.status(err.statusCode).send(err);
    }

}

export async function deleteTopic(req: FastifyRequest, res: FastifyReply) {
    const params = req.params as any;
    const id = params["id"];

    try {
        const topic = await prisma.topic.delete({
            where: {
                id: +id
            }
        })
        res.status(HTTPStatus.NO_CONTENT).send({
            message: `Topic with ID ${+id} successfully deleted.`
        })

    } catch (err: any) {
        if (err.code === PrismaError.RECORD_NOT_FOUND) {
            err.statusCode = 404;
            err.message = `Topic with ID ${+id} not found.`;
        }
        if (!err.statusCode) {
            err.statusCode = HTTPStatus.INTERNAL_SERVER_ERROR;
        }
        res.status(err.statusCode).send(err);
    }
}