<template>
  <DropdownMenuContent v-bind="forward">
    <DropdownMenuContentBase>
      <slot />
    </DropdownMenuContentBase>
  </DropdownMenuContent>
</template>

<script setup lang="ts">
import {
  DropdownMenuContent,
  type DropdownMenuContentEmits,
  type DropdownMenuContentProps,
  useForwardPropsEmits,
} from 'reka-ui'
import DropdownMenuContentBase from './DropdownMenuContentBase.vue'

const props = withDefaults(defineProps<DropdownMenuContentProps>(), {
  asChild: true,
  collisionPadding: 8,
})

const emits = defineEmits<DropdownMenuContentEmits>()

const forward = useForwardPropsEmits(props, emits)
</script>
