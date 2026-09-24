<template>
  <Primitive v-bind="props" class="mr-2 size-5">
    <slot />
  </Primitive>
</template>

<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui'

const props = defineProps<PrimitiveProps>()
</script>
