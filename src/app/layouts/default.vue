<template>
  <div id="__layout">
    <NuxtPage />

    <ToastProvider>
      <ToastRoot
        v-for="(toast, i) in toasts"
        :key="i"
        :duration="toast.duration"
        :variant="toast.variant"
        @update:open="(open) => handleToastOpenUpdate(toast.id, open)"
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
  </div>
</template>

<script setup lang="ts">
import { ToastProvider, ToastViewport } from '~/shared/ui/toast'
import { useToasts } from '~/shared/model'
import ToastHeader from '~/shared/ui/toast/ToastHeader.vue'
import ToastDescription from '~/shared/ui/toast/ToastDescription.vue'
import ToastTitle from '~/shared/ui/toast/ToastTitle.vue'
import ToastRoot from '~/shared/ui/toast/ToastRoot.vue'
import ToastClose from '~/shared/ui/toast/ToastClose.vue'
import ToastVariantIcon from '~/shared/ui/toast/ToastVariantIcon.vue'

const { toasts, remove } = useToasts()

const handleToastOpenUpdate = (id: string, open: boolean) => {
  if (!open) {
    remove(id)
  }
}
</script>
