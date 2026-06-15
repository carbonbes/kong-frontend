<template>
  <button
    class="px-4 py-2 font-medium rounded-3xl ring-1 not-disabled:cursor-pointer disabled:opacity-50"
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
    return 'bg-blue-600 text-white hover:not-disabled:bg-blue-700 active:not-disabled:bg-blue-800 ring-transparent'
  }

  if (variant === 'secondary') {
    return 'bg-white text-gray-700 hover:not-disabled:bg-gray-100 active:not-disabled:bg-gray-200 ring-gray-200 shadow'
  }
})
</script>
