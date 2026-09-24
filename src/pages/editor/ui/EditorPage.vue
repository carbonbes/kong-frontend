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

const { content } = defineProps<EditorPageProps>()

const editor = useEditor({
  content,
  editorProps: {
    attributes: {
      class: 'mx-auto p-4 max-w-160 prose prose-black touch-pan-y',
    },
  },
  extensions: [StarterKit],
})

const { isTouch } = useDevice()
</script>
