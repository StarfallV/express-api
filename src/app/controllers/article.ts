import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from "@prisma/client";
import { ArticleStatus, PrismaError, SortOrder } from '../types';
import { HTTPStatus } from '../types';

const prisma: PrismaClient = new PrismaClient();

export async function getArticles(req: FastifyRequest, res: FastifyReply) {
    const status = req.query["status"];
    const topic = req.query["topic"];

    try {
        const articles = await prisma.article.findMany({
            include: {
                topic: true
            },
            where: {
                status: {
                    not: 9
                },
                OR: [
                    {
                        status: status !== undefined ? Number(status) : undefined,
                    },
                    {
                        topic: {
                            some: {
                                name: topic !== undefined ? String(topic) : undefined
                            }
                        }
                    }
                ]
            }
        })
        res.status(HTTPStatus.OK).send({
            message: 'All articles successfully fetched.',
            count: articles.length,
            data: { articles: articles }
        })

    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = HTTPStatus.INTERNAL_SERVER_ERROR;
        }
        res.status(err.statusCode).send(err);
    }
}

export async function getArticle(req: FastifyRequest, res: FastifyReply) {
    const id = req.params["id"];

    try {
        const article = await prisma.article.findUnique({
            include: {
                topic: true
            },
            where: {
                id: +id
            }
        })

        if (article && article.status != ArticleStatus.DELETED) {
            res.status(HTTPStatus.OK).send({
                message: `Article with ID ${+id} successfully fetched.`,
                data: article
            })
        } else {
            res.status(HTTPStatus.NOT_FOUND).send({
                message: `Article with ID ${+id} not found.`
            })
        }

    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = HTTPStatus.INTERNAL_SERVER_ERROR;
        }
        res.status(err.statusCode).send(err);
    }
}


export async function createArticle(req: FastifyRequest, res: FastifyReply) {
    const data = req.body as any;

    try {
        await prisma.$transaction(async (tx) => {
            //create article
            const newArticle = await prisma.article.create({
                data: {
                    title: data.title,
                    coverImageUrl: data.coverImageUrl,
                    description: data.description,
                    status: +data.status,
                    content: data.content
                }
            });

            //add topics
            for (const topic of data.topic) {
                const temp = await tx.article.update({
                    data: {
                        topic: {
                            connectOrCreate: {
                                where: {
                                    name: topic.name
                                },
                                create: {
                                    name: topic.name
                                }
                            }
                        }
                    },
                    where: {
                        id: newArticle.id
                    }
                })
            }

            res.status(HTTPStatus.CREATED).send({
                message: 'Article successfully created.',
                data: newArticle
            });
        })

    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = HTTPStatus.INTERNAL_SERVER_ERROR;
        }
        res.status(err.statusCode).send(err);
    }

}

export async function updateArticle(req: FastifyRequest, res: FastifyReply) {
    const id = req.params["id"];
    const data = req.body as any;

    try {

        await prisma.$transaction(async (tx) => {
            //update article
            const article = await prisma.article.update({
                data: {
                    title: data.title,
                    coverImageUrl: data.coverImageUrl,
                    description: data.description,
                    content: data.content
                },
                where: {
                    id: +id
                }
            });

            //clear topics
            if (data.topic !== undefined) {
                const topics = await prisma.article.update({
                    data: {
                        topic: {
                            set: []
                        }
                    },
                    where: {
                        id: +id
                    }
                });
            }

            //add new topics
            for (const topic of data.topic) {
                const temp = await tx.article.update({
                    data: {
                        topic: {
                            connectOrCreate: {
                                where: {
                                    name: topic.name
                                },
                                create: {
                                    name: topic.name
                                }
                            }
                        }
                    },
                    where: {
                        id: +id
                    }
                })
            }

            res.status(HTTPStatus.OK).send({
                message: `Article with ID ${+id} successfully updated.`,
                data: article
            });
        })

    } catch (err: any) {
        if (err.code === PrismaError.RECORD_NOT_FOUND) {
            err.statusCode = 404;
            err.message = `Article with ID ${+id} not found.`;
        }
        if (!err.statusCode) {
            err.statusCode = HTTPStatus.INTERNAL_SERVER_ERROR;
        }
        res.status(err.statusCode).send(err);
    }
}

export async function deleteArticle(req: FastifyRequest, res: FastifyReply) {
    const id = req.params["id"];

    try {
        const article = await prisma.article.update({
            data: {
                status: 9
            },
            where: {
                id: +id
            }
        })
        res.status(HTTPStatus.OK).send({
            message: `Article with ID ${+id} successfully deleted.`
        })

    } catch (err: any) {
        if (err.code === PrismaError.RECORD_NOT_FOUND) {
            err.statusCode = 404;
            err.message = `Article with ID ${+id} not found.`;
        }
        if (!err.statusCode) {
            err.statusCode = HTTPStatus.INTERNAL_SERVER_ERROR;
        }
        res.status(err.statusCode).send(err);
    }
}