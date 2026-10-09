import { Extension } from '@tiptap/core'
import type { Attrs } from '@tiptap/pm/model'
import { NodeSelection } from '@tiptap/pm/state'
import type { EditorRootNodes } from '../model/root-nodes.ts'
import { LIST_NODES } from '../config/list-nodes.ts'
import { BLOCKQUOTE_NODE } from '../config/blockquote-node.ts'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    NodeInsert: {
      insertNode: (nodeName: EditorRootNodes, nodeAttrs?: Attrs) => ReturnType
    }
  }
}

export const NodeInsert = Extension.create({
  name: 'nodeInsert',

  addCommands() {
    return {
      insertNode:
        (nodeName, nodeAttrs) =>
        ({
          state: {
            selection,
            schema: { nodes },
          },
          tr,
          dispatch,
        }) => {
          if (!(selection instanceof NodeSelection) || !dispatch) return false

          const insertPos = selection.to

          const createListNode = () => {
            const listNodeType = nodes[nodeName]!

            return listNodeType.createAndFill()
          }

          const createQuoteNode = () => {
            const quoteNodeType = nodes.blockquote!

            return quoteNodeType.createAndFill()
          }

          const createRegularNode = () => {
            const nodeType = nodes[nodeName]!

            return nodeType.create(nodeAttrs)
          }

          const createNode = () => {
            const listNodes = LIST_NODES as ReadonlyArray<string>

            if (listNodes.includes(nodeName)) {
              return createListNode()
            } else if (nodeName === BLOCKQUOTE_NODE) {
              return createQuoteNode()
            }

            return createRegularNode()
          }

          const node = createNode()

          if (!node) return false

          dispatch(tr.insert(insertPos, node))

          return true
        },
    }
  },
})
