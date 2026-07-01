<template>
  <input
    v-bind="inputAttrs"
    v-model.trim="model"
    class="bg-gray-100 focus:bg-white ring-2 ring-gray-200 hover:ring-blue-700 focus:ring-blue-700 disabled:pointer-events-none disabled:opacity-50 placeholder:text-gray-400 data-[error=true]:bg-red-50 data-[error=true]:ring-red-600 data-[success=true]:bg-green-50 data-[success=true]:ring-green-600"
    :class="[rounding, sizes, bg]"
    :data-error="error"
    :data-success="success"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { InputProps } from './input.props.interface'

const {
  error,
  rounded = 'medium',
  size = 'medium',
  success,
  ...inputAttrs
} = defineProps<InputProps>()

const model = defineModel<string>()

const rounding = computed(() =>
  rounded === 'small'
    ? 'px-2.5 rounded-lg'
    : rounded === 'medium'
      ? 'px-4 rounded-2xl'
      : 'px-6 rounded-3xl',
)

const sizes = computed(() =>
  size === 'small' ? 'py-2.5' : size === 'medium' ? 'py-3' : 'py-4',
)

const bg = computed(() => model.value && 'bg-white')
</script>
