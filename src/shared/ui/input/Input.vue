<template>
  <input
    v-model.trim="model"
    class="px-4 py-2 bg-gray-100 placeholder:text-gray-400 not-disabled:focus:bg-white rounded-3xl ring-2 ring-gray-200 disabled:opacity-50 not-disabled:hover:ring-blue-700 not-disabled:focus:ring-blue-700"
    :class="classes"
    :disabled
    :placeholder
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { disabled, placeholder } = defineProps<{
  disabled?: boolean
  placeholder?: string
}>()

const model = defineModel<string>()

const classes = computed(() => model.value && 'bg-white')
</script>
