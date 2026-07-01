import type { Meta, StoryObj } from '@nuxtjs/storybook'
import SignupPageComponent from './SignupPage.vue'

const meta = {
  args: {},
  component: SignupPageComponent,
  render: (args) => ({
    components: { SignupPageComponent },
    setup() {
      return { args }
    },
    template: '<SignupPageComponent v-bind="args" />',
  }),
  title: 'Pages/Signup',
} satisfies Meta<typeof SignupPageComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Signup: Story = {}
