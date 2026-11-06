export type ArticleNodeInput =
  | string
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'blockquote'; text: string }
  | { type: 'bulletList'; text: string }
  | { type: 'orderedList'; text: string }
