<template>
  <NuxtLink :to="{ name: 'ArticlePage', params: { id: articleId } }">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
const { articleId } = defineProps<{ articleId: number }>()
</script>
