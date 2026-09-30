<template>
  <EditorContent
    ref="editorContent"
    :content
    class="mx-auto max-w-160 h-full [&>.tiptap]:p-4 [&>.tiptap]:sm:pl-22 [&>.tiptap]:pb-50"
    @update="handleUpdate"
  />

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

const emits = defineEmits<{ update: [data: JSONContent] }>()

const editorContentRef = useTemplateRef<typeof EditorContent>('editorContent')

const editor = computed(() => editorContentRef.value?.editor)

const { isTouch } = useDevice()

const handleUpdate = (data: JSONContent) => {
  emits('update', data)
}
</script>
