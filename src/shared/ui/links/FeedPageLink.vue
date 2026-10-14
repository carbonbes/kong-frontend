<template>
  <NuxtLink :to="{ name: 'FeedPage', params: { order: order } }">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import type { OrderBy } from '~/shared/model'

const { order } = defineProps<{ order?: OrderBy }>()
</script>
