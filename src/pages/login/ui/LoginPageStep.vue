<template>
  <TabsContent v-bind="props" class="size-full">
    <slot />
  </TabsContent>
</template>

<script setup lang="ts">
import { TabsContent, type TabsContentProps } from 'reka-ui'

const props = defineProps<TabsContentProps>()
</script>
