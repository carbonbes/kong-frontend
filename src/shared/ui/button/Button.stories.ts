import type { Meta, StoryObj } from '@nuxtjs/storybook'
import Button from './Button.vue'

const meta = {
  args: { disabled: false },
  argTypes: {
    variant: {
      table: { disable: true },
    },
  },
  component: Button,
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Отправить</Button>',
  }),
  title: 'Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { variant: 'primary' },
}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}
