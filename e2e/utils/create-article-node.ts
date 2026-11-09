import type { ArticleMarkInput, ArticleNodeInput } from '../types'

const createTextNode = (text: string) => ({
  type: 'text',
  text,
})

const createMarkedTextNode = (node: ArticleMarkInput) => {
  if (node.type === 'hardBreak') {
    return {
      type: 'hardBreak',
    }
  }

  if (node.type === 'text') {
    return createTextNode(node.text)
  }

  if (node.type === 'link') {
    return {
      type: 'text',
      text: node.text,
      marks: [
        {
          type: 'link',
          attrs: {
            href: node.href,
          },
        },
      ],
    }
  }

  if (node.type === 'code' || node.type === 'underline') {
    return {
      type: 'text',
      text: node.text,
      marks: [
        {
          type: node.type,
        },
      ],
    }
  }

  const attrs = node.testid ? { testid: node.testid } : undefined

  return {
    type: 'text',
    text: node.text,
    marks: [
      {
        type: node.type,
        ...(attrs && { attrs }),
      },
    ],
  }
}

export const createArticleNode = (node: ArticleNodeInput) => {
  if (typeof node === 'string') {
    return {
      type: 'paragraph',
      content: [createTextNode(node)],
    }
  }

  const testidAttrs = node.testid ? { testid: node.testid } : undefined

  if (node.type === 'paragraph') {
    return {
      type: 'paragraph',
      ...(testidAttrs && { attrs: testidAttrs }),
      content: node.children.map((child) => createMarkedTextNode(child)),
    }
  }

  if (node.type === 'heading') {
    return {
      type: 'heading',
      attrs: {
        level: node.level,
        ...(testidAttrs ?? {}),
      },
      content: [createTextNode(node.text)],
    }
  }

  if (node.type === 'blockquote') {
    return {
      type: 'blockquote',
      ...(testidAttrs && { attrs: testidAttrs }),
      content: [
        {
          type: 'paragraph',
          content: [createTextNode(node.text)],
        },
      ],
    }
  }

  if (node.type === 'horizontalRule') {
    return {
      type: 'horizontalRule',
      ...(testidAttrs && { attrs: testidAttrs }),
    }
  }

  return {
    type: node.type,
    ...(testidAttrs && { attrs: testidAttrs }),
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
