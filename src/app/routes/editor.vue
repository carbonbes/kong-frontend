<template>
  <EditorPage :content />
</template>

<script setup lang="ts">
import { EditorPage } from '~/pages/editor'

definePageMeta({
  name: 'EditorPage',
})

const content = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: `I'm running Tiptap with Vue.js. 🎉`,
        },
      ],
    },
  ],
}
</script>
