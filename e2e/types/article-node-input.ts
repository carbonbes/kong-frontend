export type ArticleMarkInput =
  | { type: 'text'; text: string }
  | { type: 'bold'; text: string; testid?: string }
  | { type: 'italic'; text: string; testid?: string }
  | { type: 'strike'; text: string; testid?: string }
  | { type: 'code'; text: string }
  | { type: 'underline'; text: string }
  | { type: 'link'; text: string; href: string }
  | { type: 'hardBreak' }

export type ArticleNodeInput =
  | string
  | {
      type: 'paragraph'
      children: ReadonlyArray<ArticleMarkInput>
      testid?: string
    }
  | { type: 'heading'; level: 2 | 3; text: string; testid?: string }
  | { type: 'blockquote'; text: string; testid?: string }
  | { type: 'bulletList'; text: string; testid?: string }
  | { type: 'orderedList'; text: string; testid?: string }
  | { type: 'horizontalRule'; testid?: string }
