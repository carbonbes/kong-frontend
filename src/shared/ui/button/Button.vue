<template>
  <button
    class="px-5 font-medium inset-ring-2 rounded-3xl cursor-pointer disabled:pointer-events-none disabled:opacity-50"
    :class="[sizes, variants]"
    :disabled
    :type
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps } from './button.props.interface'

const sizesObj = { sm: 'h-10', md: 'h-12', lg: 'h-14' }

const variantsObj = {
  primary:
    'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white inset-ring-blue-600 hover:inset-ring-blue-700 active:inset-ring-blue-800',
  secondary:
    'bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800 inset-ring-gray-200 hover:inset-ring-gray-300 active:inset-ring-gray-400',
  danger:
    'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white inset-ring-red-600 hover:inset-ring-red-700 active:inset-ring-red-800',
}

const {
  disabled,
  size = 'md',
  type = 'button',
  variant = 'primary',
} = defineProps<ButtonProps>()

const sizes = computed(() => sizesObj[size])
const variants = computed(() => variantsObj[variant])
</script>
