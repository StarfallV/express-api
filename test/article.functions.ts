import { Context } from '../context'

interface CreateArticle {
  title: string,
  coverImageUrl: string,
  description: string,
  status: number,
  content: string,
  topic: { name: string }[]
}

export async function createArticle(article: CreateArticle, ctx: Context) {
  return await ctx.prisma.article.create({
    data: {
      title: article.title,
      coverImageUrl: article.coverImageUrl,
      description: article.description,
      status: +article.status,
      content: article.content,
      topic: {
        connectOrCreate: article.topic.map((topic) => {
          return {
            where: { name: topic.name },
            create: { name: topic.name }
          }
        })
      }
    }
  });
}

interface updateArticle {
  id: number,
  title: string,
  topic: { name: string }[]
}

export async function updateArticleTitleAndTopics(article: updateArticle, ctx: Context) {
  return await ctx.prisma.article.update({
    data: {
      title: article.title,
      topic: {
        set: [],
        connectOrCreate: article.topic.map((topic) => {
          return {
            where: { name: topic.name },
            create: { name: topic.name }
          }
        })
      }
    },
    where: {
      id: +article.id
    }
  });
}

interface deleteArticle {
  id: number
}

export async function deleteArticle(article: deleteArticle, ctx: Context) {
  return await ctx.prisma.article.update({
    data: {
      status: 9
    },
    where: {
      id: +article.id
    }
  });
}