<template>
  <EditorContent :editor class="h-full" />

  <EditorNodeHoverMenu v-if="editor && !isTouch" :editor />
  <EditorNodeSwipeMenu v-if="editor && isTouch" :editor />
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import type { EditorPageProps } from './editor-page.props.interface.ts'
import EditorNodeHoverMenu from './EditorNodeHoverMenu.vue'
import EditorNodeSwipeMenu from './EditorNodeSwipeMenu.vue'
import { NodeAttrs } from '../lib/node-attrs.ts'
import { HorizontalRuleNode } from '../lib/horizontal-rule-node.ts'
import { NodeInsert } from '../lib/node-insert.ts'
import { NodeMoving } from '../lib/node-moving.ts'
import { NodeTransform } from '../lib/node-transform.ts'

const { content } = defineProps<EditorPageProps>()

const editor = useEditor({
  content,
  editorProps: {
    attributes: {
      class:
        'mx-auto p-4 pb-50 max-w-160 prose prose-black touch-pan-y overflow-x-hidden prose-hr:my-0 [&>*]:data-[type=horizontalRule]:my-8 [&>*]:data-[type=horizontalRule]:py-4',
    },
  },
  extensions: [
    StarterKit.configure({
      codeBlock: false,
      horizontalRule: false,
    }),
    HorizontalRuleNode,
    NodeAttrs,
    NodeInsert,
    NodeMoving,
    NodeTransform,
  ],
})

const { isTouch } = useDevice()
</script>
