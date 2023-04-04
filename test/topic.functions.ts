import { Context } from '../context'

interface CreateTopic {
  name: string
}

export async function createTopic(topic: CreateTopic, ctx: Context) {
  return await ctx.prisma.topic.create({
    data: topic,
  })
}

interface UpdateTopic {
  id: number
  name: string
}

export async function updateTopicName(topic: GetTopic, ctx: Context) {
  return await ctx.prisma.topic.update({
    where: { id: topic.id },
    data: topic
  })
}

interface GetTopic {
  id: number
}

export async function getTopicById(topic: GetTopic, ctx: Context) {
  return await ctx.prisma.topic.findUnique({
    where: { id: topic.id }
  })
}