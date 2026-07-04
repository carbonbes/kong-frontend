import type { Meta, StoryObj } from '@nuxtjs/storybook'
import InputComponent from './Input.vue'

const meta = {
  args: { disabled: false, placeholder: '', size: 'md' },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  component: InputComponent,
  decorators: [
    () => ({
      template:
        '<div style="position: fixed; inset: 0; display: flex; align-items: center; justify-content: center;"><story/></div>',
    }),
  ],
  render: (args) => ({
    components: { InputComponent },
    setup() {
      return { args }
    },
    template: '<InputComponent v-bind="args" />',
  }),
  title: 'Components/Input',
} satisfies Meta<typeof InputComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Input: Story = {}
