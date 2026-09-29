<template>
  <button
    class="p-2 bg-white hover:bg-gray-100 rounded-full cursor-pointer"
    :class="{ '!bg-blue-50 text-blue-600': active }"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const { active } = defineProps<{ active: boolean }>()
</script>
