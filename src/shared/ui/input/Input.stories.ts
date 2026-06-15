import type { Meta, StoryObj } from '@nuxtjs/storybook'
import Input from './Input.vue'

const meta = {
  args: { disabled: false },
  component: Input,
  render: (args) => ({
    components: { Input },
    setup() {
      return { args }
    },
    template: '<Input v-bind="args" />',
  }),
  title: 'Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    placeholder: '',
  },
}
