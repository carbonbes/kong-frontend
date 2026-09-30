import { Extension } from '@tiptap/core'
import { PluginKey } from '@tiptap/pm/state'
import { Plugin } from 'prosemirror-state'

export const TrailingNode = Extension.create({
  name: 'trailingNode',

  addProseMirrorPlugins() {
    const plugin = new PluginKey(this.name)
    const nodeType = this.editor.schema.nodes.paragraph!

    return [
      new Plugin({
        key: plugin,

        appendTransaction(transactions, oldState, newState) {
          const { doc, tr } = newState
          const lastNode = doc.lastChild

          if (!lastNode) {
            return
          }

          const lastNodeContentFirstChild = lastNode.content.content[0]
          if (!lastNodeContentFirstChild) {
            return
          }

          const lastNodeIsTextBlock = lastNodeContentFirstChild.isTextblock
          const lastNodeIsEmpty =
            lastNodeContentFirstChild.textContent.trim() === ''

          if (
            (lastNodeIsTextBlock && !lastNodeIsEmpty) ||
            !lastNodeIsTextBlock
          ) {
            return tr
              .setMeta('addToHistory', false)
              .insert(doc.content.size, nodeType.create())
          }

          return
        },
      }),
    ]
  },
})
