<template>
  <button class="h-12 flex items-center gap-4 font-medium" @click="handleClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { injectDrawerRootContext } from 'reka-ui'

const { preventClose } = defineProps<{
  preventClose?: boolean
}>()

const { onOpenToggle } = injectDrawerRootContext()

const handleClick = () => {
  if (preventClose) {
    return
  }

  onOpenToggle()
}
</script>
