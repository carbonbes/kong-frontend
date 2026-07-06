import type { Meta, StoryObj } from '@nuxtjs/storybook'
import { ToastItem, ToastProvider, ToastViewport } from '~/shared/ui/toast'

const meta = {
  decorators: [
    () => ({
      template:
        '<div style="position: fixed; inset: 0; display: flex; align-items: center; justify-content: center;"><story/></div>',
    }),
  ],
  render: () => ({
    components: {
      ToastItem,
      ToastProvider,
      ToastViewport,
    },
    setup() {
      const toasts = [
        {
          description: 'Описание',
          duration: 0,
          id: '1',
          title: 'Успех',
          variant: 'success',
        },
        {
          description: 'Описание',
          duration: 0,
          id: '1',
          title: 'Ошибка',
          variant: 'danger',
        },
      ]

      return { toasts }
    },
    template: `
      <ToastProvider>
        <ToastItem v-for="(toast, i) in toasts" :key="i" :toast />
        <ToastViewport class="static" />
      </ToastProvider>
    `,
  }),
  title: 'Components/Toast',
}

export default meta
type Story = StoryObj<typeof meta>

export const StackedToasts: Story = {}
