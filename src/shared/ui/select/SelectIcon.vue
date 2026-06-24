<template>
  <SelectIcon v-bind="props">
    <Icon name="tabler:chevron-down" class="size-6" :class="classes" />
  </SelectIcon>
</template>

<script setup lang="ts">
import {
  injectSelectRootContext,
  SelectIcon,
  type SelectIconProps,
} from 'reka-ui'
import { computed } from 'vue'

const props = defineProps<SelectIconProps>()

const { open } = injectSelectRootContext()

const classes = computed(() => ({ 'rotate-180': open.value }))
</script>
