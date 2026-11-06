import type { ArticleNodeInput } from '../types'

const createTextNode = (text: string) => ({
  type: 'text',
  text,
})

export const createArticleNode = (node: ArticleNodeInput) => {
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
