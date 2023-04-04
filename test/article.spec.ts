import { MockContext, Context, createMockContext } from '../context'
import { createArticle, deleteArticle, updateArticleTitleAndTopics } from './article.functions'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

test('should create new article ', async () => {

  const article = {
    id: 1,
    title: 'New article 1',
    coverImageUrl: "https://testUrl.com",
    description: "New Description Article 1",
    content: "New Content Article 1",
    status: 0,
    topic: [{name: "Business"}, {name: "Economy"}]
  }
  mockCtx.prisma.article.create.mockResolvedValue(article)

  await expect(createArticle(article, ctx)).resolves.toEqual({
    id: 1,
    title: 'New article 1',
    coverImageUrl: "https://testUrl.com",
    description: "New Description Article 1",
    content: "New Content Article 1",
    status: 0,
    topic: [{name: "Business"}, {name: "Economy"}]
  })
})

test('should update the article title and topics ', async () => {

  const article = {
    id: 1,
    title: 'New article 1 updated',
    coverImageUrl: "https://testUrl.com",
    description: "New Description Article 1",
    content: "New Content Article 1",
    status: 0,
    topic: [{name: "Fashion"}]
  }
  mockCtx.prisma.article.update.mockResolvedValue(article)

  const updateArticle = {
    id: 1,
    title: 'New article 1 updated',
    topic: [{name: "Fashion"}]
  }

  await expect(updateArticleTitleAndTopics(updateArticle, ctx)).resolves.toEqual({
    id: 1,
    title: 'New article 1 updated',
    coverImageUrl: "https://testUrl.com",
    description: "New Description Article 1",
    content: "New Content Article 1",
    status: 0,
    topic: [{name: "Fashion"}]
  })
})

test('should update the article status to 9 (deleted) ', async () => {

  const article = {
    id: 1,
    title: 'New article 1 updated',
    coverImageUrl: "https://testUrl.com",
    description: "New Description Article 1",
    content: "New Content Article 1",
    status: 9,
    topic: [{name: "Fashion"}]
  }
  mockCtx.prisma.article.update.mockResolvedValue(article)

  const deleteArticleInterface = {
    id: 1,
  }

  await expect(deleteArticle(deleteArticleInterface, ctx)).resolves.toEqual({
    id: 1,
    title: 'New article 1 updated',
    coverImageUrl: "https://testUrl.com",
    description: "New Description Article 1",
    content: "New Content Article 1",
    status: 9,
    topic: [{name: "Fashion"}]
  })
})