<template>
  <PinInputRoot v-bind="forward" class="flex gap-2">
    <slot />
  </PinInputRoot>
</template>

<script setup lang="ts">
import {
  PinInputRoot,
  type PinInputRootEmits,
  type PinInputRootProps,
  useForwardPropsEmits,
} from 'reka-ui'

const props = withDefaults(defineProps<PinInputRootProps>(), {
  otp: true,
  placeholder: '*',
})

const emits = defineEmits<PinInputRootEmits>()

const forward = useForwardPropsEmits(props, emits)
</script>
