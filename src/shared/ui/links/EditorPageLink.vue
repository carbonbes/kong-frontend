<template>
  <NuxtLink :to="{ name: 'EditorPage', query: { id: articleId } }">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
const { articleId } = defineProps<{ articleId?: number }>()
</script>
