import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import * as controller from '../controllers/topic';

const route = 'topic';

export default async function (fastify: FastifyInstance) {
  //GET Topics: /topic
  //Get All Topics
  fastify.get(
    `/${route}`,
    controller.getTopics
  )
  //GET Topic: /topic/{id}
  //Get Topic by ID
  fastify.get(
    `/${route}/:id`,
    controller.getTopic
  )

  //POST Topic: /topic
  //Create new Topic
  fastify.post(
    `/${route}`,
    controller.createTopic
  )

  //PUT Topic: /topic/{id}
  //Update Topic by ID
  fastify.put(
    `/${route}/:id`,
    controller.updateTopic
  )

  //DELETE Topic: /topic/{id}
  //Delete Topic by ID
  fastify.delete(
    `/${route}/:id`,
    controller.deleteTopic
  )
}
