import { Node } from '@tiptap/core'

export const HorizontalRuleNode = Node.create({
  name: 'horizontalRule',

  group: 'block',

  parseHTML() {
    return [{ tag: 'hr' }, { tag: 'div[data-type="horizontalRule"]' }]
  },

  renderHTML() {
    return ['div', { 'data-type': 'horizontalRule' }, ['hr']]
  },
})
