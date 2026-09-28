<template>
  <BottomDrawerTrigger as-child>
    <BottomDrawerContentItemBase prevent-close>
      <slot />

      <BottomDrawerContentItemIcon
        name="tabler:chevron-right"
        class="ml-auto"
      />
    </BottomDrawerContentItemBase>
  </BottomDrawerTrigger>
</template>

<script setup lang="ts">
import { BottomDrawerTrigger } from './'
import BottomDrawerContentItemBase from './BottomDrawerContentItemBase.vue'
import BottomDrawerContentItemIcon from '~/shared/ui/bottom-drawer/BottomDrawerContentItemIcon.vue'
</script>
