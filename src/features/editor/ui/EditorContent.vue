<template>
  <EditorContent :editor />
</template>

<script setup lang="ts">
import {
  type Content,
  EditorContent,
  type EditorEvents,
  type JSONContent,
  useEditor,
} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extensions'
import { HorizontalRuleNode } from '../lib/horizontal-rule-node'
import { NodeAttrs } from '../lib/node-attrs'
import { NodeInsert } from '../lib/node-insert'
import { NodeMoving } from '../lib/node-moving'
import { NodeTransform } from '../lib/node-transform'
import { NodeTestidAttr } from '../lib/node-testid-attr.ts'

const { content, readonly } = defineProps<{
  content?: Content
  readonly?: boolean
}>()

const emits = defineEmits<{
  update: [data: JSONContent]
}>()

const handleUpdate = ({ editor }: EditorEvents['update']) => {
  emits('update', editor.getJSON())
}

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
    }),
    Placeholder.configure({
      placeholder: 'Текст...',
      showOnlyCurrent: false,
    }),
    HorizontalRuleNode,
    NodeAttrs,
    NodeInsert,
    NodeMoving,
    NodeTestidAttr,
    NodeTransform,
  ],
  onUpdate: handleUpdate,
})

defineExpose({ editor })
</script>
