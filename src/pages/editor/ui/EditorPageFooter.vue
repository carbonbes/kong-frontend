<template>
  <ToastProvider>
    <ToastRoot v-model:open="isLoading" as-child>
      <BaseFloating
        class="py-2 px-4 bg-white rounded-full data-[state=open]:animate-[fadeIn_250ms] data-[state=closed]:animate-[fadeOut_250ms_750ms]"
      >
        <ToastTitle class="flex items-center gap-2">
          <p>{{ isLoading ? 'Сохранение' : 'Сохранено' }}</p>

          <HorizontalDotsLoader v-if="isLoading" class="size-6" />
          <Icon v-else name="tabler:check" class="size-6 text-green-600" />
        </ToastTitle>
      </BaseFloating>
    </ToastRoot>

    <ToastViewport
      class="fixed left-1/2 bottom-[calc(var(--bottom-navbar-height)+(var(--bottom-navbar-spacing))*2)] -translate-x-1/2"
    />
  </ToastProvider>
</template>

<script setup lang="ts">
import { ToastProvider, ToastRoot, ToastTitle, ToastViewport } from 'reka-ui'
import { BaseFloating } from '~/shared/ui/base-floating'
import { useArticleMutation } from '../model/use-article.mutation.ts'
import { HorizontalDotsLoader } from '~/shared/ui/horizontal-dots-loader'

const { isLoading } = useArticleMutation()
</script>
