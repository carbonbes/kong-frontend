import type { Meta, StoryObj } from '@nuxtjs/storybook'
import { ToastViewport } from 'reka-ui'
import { ToastAction, ToastProvider, ToastRoot, ToastTitle } from '../'

const meta = {
  args: {},
  decorators: [
    () => ({
      template:
        '<div style="position: fixed; inset: 0; display: flex; align-items: center; justify-content: center;"><story/></div>',
    }),
  ],
  render: () => ({
    components: {
      ToastAction,
      ToastProvider,
      ToastRoot,
      ToastTitle,
      ToastViewport,
    },
    template: `
      <ToastProvider>
        <ToastRoot :default-open="true" :duration="0">
          <ToastTitle>Заголовок</ToastTitle>
          <ToastAction as-child alt-text="Close">
            <Icon name="tabler:x" class="size-5" />
          </ToastAction>
        </ToastRoot>
        
        <ToastViewport />
      </ToastProvider>
    `,
  }),
  title: 'Components/Toast',
}

export default meta
type Story = StoryObj<typeof meta>

export const Toast: Story = {}
