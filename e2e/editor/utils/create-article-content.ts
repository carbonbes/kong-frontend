import type { ArticleNodeInput } from '../types'
import { createArticleNode } from './create-article-node'

export const createArticleContent = (
  nodes: ReadonlyArray<ArticleNodeInput> = [''],
) => ({
  type: 'doc',
  content: nodes.map(createArticleNode),
})
