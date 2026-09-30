<template>
  <EditorContent :editor />
</template>

<script setup lang="ts">
import { EditorContent, type JSONContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extensions'
import { HorizontalRuleNode } from '../lib/horizontal-rule-node'
import { NodeAttrs } from '../lib/node-attrs'
import { NodeInsert } from '../lib/node-insert'
import { NodeMoving } from '../lib/node-moving'
import { NodeTransform } from '../lib/node-transform'
import { TrailingNode } from '../lib/trailing-node'

const { content, readonly } = defineProps<{
  content?: JSONContent
  readonly?: boolean
}>()

const emits = defineEmits<{
  update: [data: JSONContent]
}>()

const editor = useEditor({
  content,
  editable: !readonly,
  editorProps: {
    attributes: {
      class:
        'prose prose-black touch-pan-y overflow-x-hidden prose-hr:my-0 [&>*]:data-[type=horizontalRule]:my-8 [&>*]:data-[type=horizontalRule]:py-4 [&>*]:transition-transform [&>*.is-empty]:before:content-[attr(data-placeholder)] [&>*.is-empty]:before:h-0 [&>*.is-empty]:before:text-gray-400 [&>*.is-empty]:before:float-left [&>*.is-empty]:before:pointer-events-none',
    },
  },
  extensions: [
    StarterKit.configure({
      codeBlock: false,
      horizontalRule: false,
      trailingNode: false,
    }),
    Placeholder.configure({
      placeholder: 'Текст...',
      showOnlyCurrent: false,
    }),
    HorizontalRuleNode,
    NodeAttrs,
    NodeInsert,
    NodeMoving,
    NodeTransform,
    TrailingNode,
  ],
  onUpdate: ({ editor }) => {
    const data = editor.getJSON()

    const content = editor.getJSON().content.filter((node) => {
      if (['heading', 'paragraph'].includes(node.type)) {
        return !!node.content
      }

      if (['bulletList', 'orderedList'].includes(node.type)) {
        node.content?.filter((listItem) => {
          const [paragraphNode] = listItem.content

          return !!paragraphNode.content
        })
      }
    })

    const processed = { ...data, content }

    emits('update', processed)
  },
})

defineExpose({ editor })
</script>
