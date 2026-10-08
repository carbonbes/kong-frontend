import { Extension } from '@tiptap/vue-3'
import { ROOT_NODES } from '../config/root-nodes'
import { MARKS } from '../config/marks'

export const NodeTestidAttr = Extension.create<{ types: string[] }>({
  name: 'nodeTestidAttr',

  addOptions() {
    return {
      types: [...ROOT_NODES, ...MARKS],
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,

        attributes: {
          testid: {
            parseHTML: (element) => element.getAttribute('data-testid'),

            renderHTML(attributes) {
              if (!attributes.testid) return {}

              return { 'data-testid': attributes.testid }
            },
          },
        },
      },
    ]
  },
})
