<template>
  <Primitive
    ref="scrollableArea"
    class="overflow-y-auto"
    :class="scrollableContentClasses"
  >
    <slot />
  </Primitive>
</template>

<script setup lang="ts">
import { injectDrawerRootContext, Primitive } from 'reka-ui'

const scrollableAreaRef = useTemplateRef<HTMLElement>('scrollableArea')

const { activeSnapPoint } = injectDrawerRootContext()

const { isSwiping, direction: swipeDirection } = usePointerSwipe(
  scrollableAreaRef,
  { threshold: 0 },
)

const { y } = useScroll(scrollableAreaRef)

const scrollableContentClasses = computed(() => ({
  '!overflow-y-hidden':
    activeSnapPoint.value !== 1 ||
    (activeSnapPoint.value === 1 &&
      y.value === 0 &&
      isSwiping.value &&
      swipeDirection.value === 'down'),

  '!overflow-y-auto':
    activeSnapPoint.value === 1 &&
    y.value === 0 &&
    isSwiping.value &&
    swipeDirection.value === 'up',
}))
</script>
