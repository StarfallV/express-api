import { MockContext, Context, createMockContext } from '../context'
import { createArticle } from './article.functions'

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
