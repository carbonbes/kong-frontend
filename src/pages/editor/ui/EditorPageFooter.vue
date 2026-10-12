<template>
  <ToastProvider>
    <ToastRoot v-model:open="isLoading" as-child>
      <BaseFloating
        class="py-2 px-4 bg-white rounded-full data-[state=open]:animate-[fadeIn_250ms] data-[state=closed]:animate-[fadeOut_250ms_750ms]"
      >
        <ToastTitle class="flex items-center gap-2">
          <p>{{ isLoading ? 'Сохранение' : 'Сохранено' }}</p>

          <Icon
            :name="isLoading ? 'tabler:dots' : 'tabler:check'"
            class="size-6"
            :class="{
              'text-gray-400': isLoading,
              'text-green-600': !isLoading,
            }"
          />
        </ToastTitle>
      </BaseFloating>
    </ToastRoot>

    <ToastViewport class="fixed left-1/2 bottom-22 -translate-x-1/2" />
  </ToastProvider>
</template>

<script setup lang="ts">
import { ToastProvider, ToastRoot, ToastTitle, ToastViewport } from 'reka-ui'
import { BaseFloating } from '~/shared/ui/base-floating'
import { useArticleMutation } from '../model/use-article.mutation.ts'

const { isLoading } = useArticleMutation()
</script>
