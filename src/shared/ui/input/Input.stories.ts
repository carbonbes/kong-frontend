import type { Meta, StoryObj } from '@nuxtjs/storybook'
import InputComponent from './Input.vue'

const meta = {
  args: { disabled: false, rounded: 'medium', size: 'medium' },
  argTypes: {
    rounded: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  component: InputComponent,
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

export const Input: Story = {
  args: {
    placeholder: '',
  },
}
