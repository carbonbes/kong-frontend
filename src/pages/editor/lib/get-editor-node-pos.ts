import type { EditorView } from '@tiptap/pm/view'

export const getEditorNodePos = (node: Element, view: EditorView) =>
  view.posAtDOM(node, 0) - 1
