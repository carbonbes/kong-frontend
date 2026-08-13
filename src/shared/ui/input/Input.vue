<template>
  <input
    v-bind="inputAttrs"
    v-model.trim="model"
    class="px-5 bg-gray-100 focus:bg-white rounded-full inset-ring-2 inset-ring-gray-200 hover:inset-ring-blue-700 focus:inset-ring-blue-700 disabled:pointer-events-none disabled:opacity-50 placeholder:text-gray-400 data-[error=true]:bg-red-50 data-[error=true]:inset-ring-red-600"
    :class="[sizes, bg]"
    :data-error="error"
    :data-size="size"
  >
</template>

<script setup lang="ts">
import type { InputProps } from './input.props.interface'

const sizesObj = { sm: 'h-10', md: 'h-12', lg: 'h-14' }

const { error, size = 'md', ...inputAttrs } = defineProps<InputProps>()

const model = defineModel<string>()

const sizes = computed(() => sizesObj[size])
const bg = computed(() => model.value && 'bg-white')
</script>
