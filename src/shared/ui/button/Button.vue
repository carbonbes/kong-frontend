<template>
  <button
    class="font-medium ring-2 cursor-pointer disabled:pointer-events-none disabled:opacity-50"
    :class="[rounding, sizes, variants]"
    :disabled
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps } from './button.props.interface'

const {
  disabled,
  rounded = 'medium',
  size = 'medium',
  variant = 'primary',
} = defineProps<ButtonProps>()

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

const variants = computed(() =>
  variant === 'danger'
    ? 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white ring-red-600 hover:ring-red-700 active:ring-red-800'
    : variant === 'primary'
      ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white ring-blue-600 hover:ring-blue-700 active:ring-blue-800'
      : 'bg-white hover:bg-gray-200 active:bg-gray-300 text-gray-800 ring-gray-200 hover:ring-gray-200 active:ring-gray-300',
)
</script>
