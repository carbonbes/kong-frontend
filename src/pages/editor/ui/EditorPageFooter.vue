<template>
  <ToastProvider>
    <ToastRoot v-model:open="isLoading" as-child>
      <BaseFloating
        class="py-2 px-4 bg-white rounded-full data-[state=open]:animate-[fadeIn_250ms] data-[state=closed]:animate-[fadeOut_250ms_750ms]"
        data-testid="editor-page-footer/toast"
      >
        <ToastTitle class="flex items-center gap-2">
          <p data-testid="editor-page-footer/toast/title">
            {{ isLoading ? 'Сохранение' : 'Сохранено' }}
          </p>

          <HorizontalDotsLoader
            v-if="isLoading"
            class="size-6"
            data-testid="editor-page-footer/toast/loader"
          />

          <Icon
            v-else
            name="tabler:check"
            class="size-6 text-green-600"
            data-testid="editor-page-footer/toast/check"
          />
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
