import type { PrismaClient } from '../../../generated/prisma/client'
import type { ArticleNodeInput } from '../../types'
import { createArticle } from '../../utils'

export const richArticleNodes: ReadonlyArray<ArticleNodeInput> = [
  {
    type: 'paragraph',
    testid: 'content-paragraph',
    children: [{ type: 'text', text: 'Абзац с обычным текстом' }],
  },
  {
    type: 'paragraph',
    testid: 'content-rich-paragraph',
    children: [
      { type: 'bold', text: 'Жирный', testid: 'content-bold' },
      { type: 'italic', text: 'курсивный', testid: 'content-italic' },
      { type: 'strike', text: 'зачёркнутый', testid: 'content-strike' },
      { type: 'code', text: 'код' },
      { type: 'underline', text: 'подчёркнутый' },
      { type: 'link', text: 'ссылка', href: 'https://example.com' },
      { type: 'hardBreak' },
      { type: 'text', text: 'Текст после переноса' },
    ],
  },
  {
    type: 'heading',
    level: 2,
    text: 'Заголовок H2',
    testid: 'content-heading-2',
  },
  {
    type: 'heading',
    level: 3,
    text: 'Заголовок H3',
    testid: 'content-heading-3',
  },
  {
    type: 'blockquote',
    text: 'Цитата',
    testid: 'content-blockquote',
  },
  {
    type: 'bulletList',
    text: 'Маркированный список',
    testid: 'content-bullet-list',
  },
  {
    type: 'orderedList',
    text: 'Нумерованный список',
    testid: 'content-ordered-list',
  },
  {
    type: 'horizontalRule',
  },
]

export const createRichArticle = (prisma: PrismaClient) =>
  createArticle(prisma, richArticleNodes)
