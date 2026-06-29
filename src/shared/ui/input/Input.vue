<template>
  <input
    v-bind="props"
    v-model.trim="model"
    class="px-6 py-3 bg-gray-100 focus:bg-white rounded-3xl ring-2 ring-gray-200 hover:ring-blue-700 focus:ring-blue-700 disabled:pointer-events-none disabled:opacity-50 placeholder:text-gray-400"
    :class="classes"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface InputProps {
  autofocus?: boolean
  disabled?: boolean
  id?: string
  name?: string
  placeholder?: string
  type?: 'email' | 'text'
}

const props = defineProps<InputProps>()

const model = defineModel<string>()

const classes = computed(() => model.value && 'bg-white')
</script>
