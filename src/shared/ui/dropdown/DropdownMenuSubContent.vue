<template>
  <DropdownMenuSubContent v-bind="forward">
    <DropdownMenuContentBase>
      <slot />
    </DropdownMenuContentBase>
  </DropdownMenuSubContent>
</template>

<script setup lang="ts">
import {
  DropdownMenuSubContent,
  type DropdownMenuSubContentEmits,
  type DropdownMenuSubContentProps,
  useForwardPropsEmits,
} from 'reka-ui'
import DropdownMenuContentBase from './DropdownMenuContentBase.vue'

const props = withDefaults(defineProps<DropdownMenuSubContentProps>(), {
  asChild: true,
})

const emits = defineEmits<DropdownMenuSubContentEmits>()

const forward = useForwardPropsEmits(props, emits)
</script>
