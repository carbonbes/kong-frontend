<template>
  <PinInputRoot v-bind="props" class="flex items-center gap-2">
    <slot />
  </PinInputRoot>
</template>

<script setup lang="ts">
import { PinInputRoot, type PinInputRootProps } from 'reka-ui'

const props = withDefaults(defineProps<PinInputRootProps>(), {
  otp: true,
  placeholder: '*',
})
</script>
