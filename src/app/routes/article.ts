import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import * as controller from '../controllers/article';

const route = 'article';

export default async function (fastify: FastifyInstance) {
  //GET Articles: /article
  //Get All Articles
  fastify.get(
    `/${route}`,
    controller.getArticles
  )
  //GET Article: /article/{id}
  //Get Article by ID
  fastify.get(
    `/${route}/:id`,
    controller.getArticle
  )

  //POST Article: /article
  //Create new Article
  fastify.post(
    `/${route}`,
    controller.createArticle
  )

  //PUT Article: /article/{id}
  //Update Article by ID
  fastify.put(
    `/${route}/:id`,
    controller.updateArticle
  )

  //PATCH Article: /article/{id}
  //Publish Article by ID
  fastify.patch(
    `/${route}/:id`,
    controller.publishArticle
  )

  //DELETE Article: /article/{id}
  //Delete Article by ID
  fastify.delete(
    `/${route}/:id`,
    controller.deleteArticle
  )
}
