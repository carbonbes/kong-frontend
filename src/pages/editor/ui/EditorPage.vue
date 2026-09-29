<template>
  <EditorContent ref="editorContent" :content class="h-full" />

  <EditorNodeHoverMenu v-if="editor && !isTouch" :editor="editor" />
  <EditorNodeSwipeMenu v-if="editor && isTouch" :editor="editor" />
  <EditorTextSelectionMenu v-if="editor" :editor="editor" />
</template>

<script setup lang="ts">
import { EditorContent } from '~/features/editor'
import type { JSONContent } from '@tiptap/vue-3'
import EditorNodeHoverMenu from './EditorNodeHoverMenu.vue'
import EditorNodeSwipeMenu from './EditorNodeSwipeMenu.vue'
import EditorTextSelectionMenu from './EditorTextSelectionMenu.vue'

const { content } = defineProps<{ content?: JSONContent }>()

const editorContentRef = useTemplateRef('editorContent')

const editor = computed(() => editorContentRef.value?.editor)

const { isTouch } = useDevice()
</script>
