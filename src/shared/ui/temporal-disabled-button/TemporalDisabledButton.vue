<template>
  <Button
    v-bind="buttonProps"
    class="relative before:absolute before:inset-0 before:w-(--timer-progress) before:bg-black/50 overflow-hidden"
    :disabled="isActive"
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
  duration,
  immediate,
  ...buttonProps
} = defineProps<TemporalDisabledButtonProps>()

const { isActive, remaining, start } = useCountdown(duration)

onMounted(() => {
  if (!immediate) {
    return
  }

  start()
})

const timerProgress = computed(
  () => `${Math.ceil((remaining.value / duration) * 100)}%`,
)

const handleClick = () => start(duration)
</script>
