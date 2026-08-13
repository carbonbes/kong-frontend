<template>
  <Primitive
    :as
    :as-child
    class="px-5 data-[circle=true]:px-0 data-[circle=true]:flex data-[circle=true]:items-center data-[circle=true]:justify-center font-medium inset-ring-2 data-[circle=true]:aspect-square rounded-full cursor-pointer disabled:pointer-events-none data-[disabled=true]:pointer-events-none disabled:opacity-50 data-[disabled=true]:opacity-50"
    :class="[sizes, variants]"
    :disabled
    :data-circle="circle"
    :data-disabled="disabled"
    :data-size="size"
    :data-variant="variant"
    :type
  >
    <slot />
  </Primitive>
</template>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import type { ButtonProps } from './button.props.interface'

const sizesObj = { sm: 'h-10', md: 'h-12', lg: 'h-14' }

const variantsObj = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 inset-ring-blue-600 hover:inset-ring-blue-700 active:inset-ring-blue-800',
  secondary:
    'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 inset-ring-gray-200 hover:inset-ring-gray-300 active:inset-ring-gray-400',
  tertiary:
    'text-gray-800 hover:bg-gray-200 active:bg-gray-300 inset-ring-transparent',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 inset-ring-red-600 hover:inset-ring-red-700 active:inset-ring-red-800',
}

const {
  as = 'button',
  asChild,
  circle,
  disabled,
  size = 'md',
  type = 'button',
  variant = 'primary',
} = defineProps<ButtonProps>()

const sizes = computed(() => sizesObj[size])
const variants = computed(() => variantsObj[variant])
</script>
