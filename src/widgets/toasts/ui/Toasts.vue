<template>
  <ToastProvider>
    <ToastRoot
      v-for="(toast, i) in toasts"
      :key="i"
      :duration="toast.duration"
      :variant="toast.variant"
      @update:open="(open) => handleToastOpen(toast.id, open)"
    >
      <ToastHeader>
        <div class="flex items-center gap-2">
          <ToastVariantIcon :variant="toast.variant" />
          <ToastTitle>{{ toast.title }}</ToastTitle>
        </div>

        <ToastClose />
      </ToastHeader>

      <ToastDescription>{{ toast.description }}</ToastDescription>
    </ToastRoot>

    <ToastViewport />
  </ToastProvider>
</template>

<script setup lang="ts">
import { ToastProvider } from 'reka-ui'
import ToastHeader from './ToastHeader.vue'
import ToastDescription from './ToastDescription.vue'
import ToastTitle from './ToastTitle.vue'
import ToastRoot from './ToastRoot.vue'
import ToastClose from './ToastClose.vue'
import ToastVariantIcon from './ToastVariantIcon.vue'
import ToastViewport from './ToastViewport.vue'
import { useToasts } from '~/shared/model'

const { toasts, remove } = useToasts()

const handleToastOpen = (id: string, open: boolean) => {
  if (!open) {
    remove(id)
  }
}
</script>
