<template>
  <input
    v-bind="inputAttrs"
    v-model.trim="model"
    class="px-5 bg-gray-100 focus:bg-white rounded-3xl inset-ring-2 inset-ring-gray-200 hover:inset-ring-blue-700 focus:inset-ring-blue-700 disabled:pointer-events-none disabled:opacity-50 placeholder:text-gray-400 data-[error=true]:bg-red-50 data-[error=true]:inset-ring-red-600 data-[success=true]:bg-green-50 data-[success=true]:inset-ring-green-600"
    :class="[sizes, bg]"
    :data-error="error"
    :data-success="success"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { InputProps } from './input.props.interface'

const {
  error,
  size = 'medium',
  success,
  ...inputAttrs
} = defineProps<InputProps>()

const model = defineModel<string>()

const sizes = computed(() =>
  size === 'small' ? 'h-10' : size === 'medium' ? 'h-12' : 'h-14',
)

const bg = computed(() => model.value && 'bg-white')
</script>
