<template>
  <Button
    v-bind="buttonProps"
    class="relative before:absolute before:inset-0 before:w-(--timer-progress) before:bg-black/50 overflow-hidden"
    :disabled="disabled || remaining > 0"
    :style="{ '--timer-progress': timerProgress }"
    @click="handleClick"
  >
    <slot />
  </Button>
</template>

<script setup lang="ts">
import { Button } from '~/shared/ui/button'
import type { TemporalDisabledButtonProps } from './temporal-disabled-button.props.interface'

const {
  disabled,
  immediate = false,
  timer,
  ...buttonProps
} = defineProps<TemporalDisabledButtonProps>()

const { remaining, start } = useCountdown(timer, {
  immediate,
})

const timerProgress = computed(
  () => `${Math.ceil((remaining.value / timer) * 100)}%`,
)

const handleClick = () => start(timer)
</script>
