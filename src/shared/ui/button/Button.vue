<template>
  <button
    class="px-4 py-2 font-medium rounded-3xl ring-2 cursor-pointer disabled:pointer-events-none disabled:opacity-50"
    :class="classes"
    :disabled
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { disabled, variant = 'primary' } = defineProps<{
  disabled?: boolean
  variant?: 'primary' | 'secondary'
}>()

const classes = computed(() => {
  if (variant === 'primary') {
    return 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white ring-blue-600 hover:ring-blue-700 active:ring-blue-800'
  }

  if (variant === 'secondary') {
    return 'bg-white hover:bg-gray-200 active:bg-gray-300 text-gray-700 ring-gray-200 hover:ring-gray-200 active:ring-gray-300'
  }
})
</script>
