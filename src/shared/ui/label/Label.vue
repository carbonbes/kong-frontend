<template>
  <Label v-bind="props" class="text-gray-800">
    <slot />
  </Label>
</template>

<script setup lang="ts">
import { Label, type LabelProps } from 'reka-ui'

const props = defineProps<LabelProps>()
</script>
