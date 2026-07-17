<template>
  <TabsRoot v-bind="forward" class="w-full h-full">
    <slot />
  </TabsRoot>
</template>

<script setup lang="ts">
import {
  TabsRoot,
  type TabsRootEmits,
  type TabsRootProps,
  useForwardPropsEmits,
} from 'reka-ui'

const props = defineProps<TabsRootProps>()
const emits = defineEmits<TabsRootEmits>()

const forward = useForwardPropsEmits(props, emits)
</script>
