import { MockContext, Context, createMockContext } from '../context'
import { createTopic, updateTopicName, getTopicById } from './topic.functions'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

test('should create new topic ', async () => {
  const topic = {
    id: 1,
    name: 'Business'
  }
  mockCtx.prisma.topic.create.mockResolvedValue(topic)

  await expect(createTopic(topic, ctx)).resolves.toEqual({
    id: 1,
    name: 'Business'
  })
})

test('should update a topic name ', async () => {
  const topic = {
    id: 1,
    name: 'Economy'
  }
  mockCtx.prisma.topic.update.mockResolvedValue(topic)

  await expect(updateTopicName(topic, ctx)).resolves.toEqual({
    id: 1,
    name: 'Economy'
  })
})

test('should get topic by id ', async () => {
    const topic = {
      id: 1,
      name: 'Economy'
    }
    mockCtx.prisma.topic.findUnique.mockResolvedValue(topic)
  
    await expect(getTopicById(topic, ctx)).resolves.toEqual({
      id: 1,
      name: 'Economy'
    })
  })
  