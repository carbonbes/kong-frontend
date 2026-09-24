<template>
  <div class="mx-auto max-w-160">
    <EditorContent :editor />
  </div>
</template>

<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const editor = useEditor({
  content: `<p>I'm running Tiptap with Vue.js. 🎉</p>`,
  extensions: [StarterKit],
  editable: false,
})
</script>
