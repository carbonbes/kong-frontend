import type { Meta, StoryObj } from '@nuxtjs/storybook'
import SigninPageComponent from './SigninPage.vue'

const meta = {
  args: {},
  component: SigninPageComponent,
  render: (args) => ({
    components: { SigninPageComponent },
    setup() {
      return { args }
    },
    template: '<SigninPageComponent v-bind="args" />',
  }),
  title: 'Pages/Signin',
} satisfies Meta<typeof SigninPageComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Signin: Story = {}
