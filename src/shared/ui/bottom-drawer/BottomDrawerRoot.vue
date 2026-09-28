<template>
  <DrawerRoot v-bind="forward">
    <slot />
  </DrawerRoot>
</template>

<script setup lang="ts">
import {
  DrawerRoot,
  type DrawerRootEmits,
  type DrawerRootProps,
  useForwardPropsEmits,
} from 'reka-ui'

const props = withDefaults(defineProps<DrawerRootProps>(), {
  swipeDirection: 'down',
})

const emits = defineEmits<DrawerRootEmits>()

const forward = useForwardPropsEmits(props, emits)
</script>
