<template>
  <ToastRoot :duration="toast.duration">
    <ToastHeader>
      <div class="flex items-center gap-2">
        <Icon
          :name="`tabler:${toast.variant === 'success' ? 'circle-check' : 'exclamation-circle'}`"
          :class="`size-6 ${toast.variant === 'success' ? 'text-green-700' : 'text-red-700'}`"
        />

        <ToastTitle>{{ toast.title }}</ToastTitle>
      </div>

      <ToastClose />
    </ToastHeader>

    <ToastDescription>{{ toast.description }}</ToastDescription>
  </ToastRoot>
</template>

<script setup lang="ts">
import ToastClose from './ToastClose.vue'
import ToastDescription from './ToastDescription.vue'
import ToastHeader from './ToastHeader.vue'
import ToastRoot from './ToastRoot.vue'
import ToastTitle from './ToastTitle.vue'
import type { Toast } from '~/shared/model'

const { toast } = defineProps<{ toast: Toast }>()
</script>
