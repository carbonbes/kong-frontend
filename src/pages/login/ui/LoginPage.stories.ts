import type { Meta, StoryObj } from '@nuxtjs/storybook'
import LoginPage from './LoginPage.vue'

const meta = {
  args: {},
  component: LoginPage,
  render: (args) => ({
    components: { LoginPage },
    setup() {
      return { args }
    },
    template: '<LoginPage v-bind="args" />',
  }),
  title: 'LoginPage',
} satisfies Meta<typeof LoginPage>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {},
}
