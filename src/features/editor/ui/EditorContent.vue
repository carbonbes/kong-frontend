<template>
  <EditorContent :editor />
</template>

<script setup lang="ts">
import { EditorContent, type JSONContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extensions'
import {
  HorizontalRuleNode,
  NodeAttrs,
  NodeInsert,
  NodeMoving,
  NodeTransform,
} from '~/features/editor'

const { content } = defineProps<{ content?: JSONContent }>()

const editor = useEditor({
  content,
  editorProps: {
    attributes: {
      class:
        'mx-auto p-4 sm:pl-22 pb-50 max-w-160 prose prose-black touch-pan-y overflow-x-hidden prose-hr:my-0 [&>*]:data-[type=horizontalRule]:my-8 [&>*]:data-[type=horizontalRule]:py-4 [&>*]:transition-transform [&>*.is-empty]:before:content-[attr(data-placeholder)] [&>*.is-empty]:before:h-0 [&>*.is-empty]:before:text-gray-400 [&>*.is-empty]:before:float-left [&>*.is-empty]:before:pointer-events-none',
    },
  },
  extensions: [
    StarterKit.configure({
      codeBlock: false,
      horizontalRule: false,
    }),
    Placeholder.configure({
      placeholder: 'Текст...',
    }),
    HorizontalRuleNode,
    NodeAttrs,
    NodeInsert,
    NodeMoving,
    NodeTransform,
  ],
})

defineExpose({ editor })
</script>
