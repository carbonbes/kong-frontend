<template>
  <Primitive
    :as
    :as-child
    class="px-5 font-medium inset-ring-2 rounded-full cursor-pointer disabled:pointer-events-none data-[disabled=true]:pointer-events-none data-[disabled-timer=true]:pointer-events-none disabled:opacity-50 data-[disabled-timer=true]:opacity-50 data-[disabled=true]:opacity-50 data-[disabled-timer=true]:relative data-[disabled-timer=true]:overflow-hidden data-[disabled-timer=true]:before:absolute data-[disabled-timer=true]:before:inset-0 data-[disabled-timer=true]:before:w-(--disabled-timer-progress) data-[disabled-timer=true]:before:h-full data-[disabled-timer=true]:before:bg-black data-[disabled-timer=true]:before:opacity-25"
    :class="[sizes, variants]"
    :disabled
    :data-disabled="disabled"
    :data-disabled-timer="!!remaining"
    :style="{ '--disabled-timer-progress': disabledTimerProgress }"
    :type
    @click="handleClick"
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
    'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white inset-ring-blue-600 hover:inset-ring-blue-700 active:inset-ring-blue-800',
  secondary:
    'bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800 inset-ring-gray-200 hover:inset-ring-gray-300 active:inset-ring-gray-400',
  danger:
    'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white inset-ring-red-600 hover:inset-ring-red-700 active:inset-ring-red-800',
}

const {
  as = 'button',
  asChild,
  disabled,
  disabledTimer,
  size = 'md',
  type = 'button',
  variant = 'primary',
} = defineProps<ButtonProps>()

const sizes = computed(() => sizesObj[size])
const variants = computed(() => variantsObj[variant])

const { remaining, start } = useCountdown(disabledTimer ?? 0)

onMounted(start)

const handleClick = () => {
  if (!disabledTimer) return

  start(disabledTimer)
}

const disabledTimerProgress = computed(() => {
  if (!disabledTimer) return

  return `${Math.ceil((remaining.value / disabledTimer) * 100)}%`
})
</script>
