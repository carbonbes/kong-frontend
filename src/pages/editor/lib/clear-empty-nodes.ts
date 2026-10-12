import type { JSONContent } from '@tiptap/vue-3'

export const clearEmptyNodes = (content: JSONContent[]) =>
  content.filter((rootNode) => {
    if (['heading', 'paragraph'].includes(rootNode.type!)) {
      return !!rootNode.content?.length
    }

    if (['bulletList', 'orderedList'].includes(rootNode.type!)) {
      rootNode.content = rootNode.content?.filter(
        (listItem) =>
          !listItem.content?.some(
            (child) => child.type === 'paragraph' && !child.content?.length,
          ),
      )
    }

    if (rootNode.type === 'blockquote') {
      return !rootNode.content?.some(
        (child) => child.type === 'paragraph' && !child.content?.length,
      )
    }

    return true
  })
