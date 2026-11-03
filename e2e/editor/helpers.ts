import type { PrismaClient } from '../../generated/prisma/client'

export type ArticleNodeInput =
  | string
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'blockquote'; text: string }
  | { type: 'bulletList'; text: string }
  | { type: 'orderedList'; text: string }

const createTextNode = (text: string) => ({
  type: 'text',
  text,
})

const createArticleNode = (node: ArticleNodeInput) => {
  if (typeof node === 'string') {
    return {
      type: 'paragraph',
      content: [createTextNode(node)],
    }
  }

  if (node.type === 'heading') {
    return {
      type: 'heading',
      attrs: {
        level: node.level,
      },
      content: [createTextNode(node.text)],
    }
  }

  if (node.type === 'blockquote') {
    return {
      type: 'blockquote',
      content: [
        {
          type: 'paragraph',
          content: [createTextNode(node.text)],
        },
      ],
    }
  }

  return {
    type: node.type,
    content: [
      {
        type: 'listItem',
        content: [
          {
            type: 'paragraph',
            content: [createTextNode(node.text)],
          },
        ],
      },
    ],
  }
}

export const createArticleContent = (
  nodes: ReadonlyArray<ArticleNodeInput> = [''],
) => ({
  type: 'doc',
  content: nodes.map(createArticleNode),
})

export const createArticle = (
  prisma: PrismaClient,
  nodes: ReadonlyArray<ArticleNodeInput> = [''],
) =>
  prisma.article.create({
    data: {
      authorId: 1,
      content: createArticleContent(nodes),
    },
  })
