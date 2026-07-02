import type { Meta, StoryObj } from '@nuxtjs/storybook'
import { PinInputInput, PinInputRoot } from './'

const meta = {
  render: (args) => ({
    components: {
      PinInputInput,
      PinInputRoot,
    },
    setup() {
      return { args }
    },
    template: `
      <PinInputRoot>
        <PinInputInput v-for="(key, index) in 6" :key :index />
      </PinInputRoot>
    `,
  }),
  title: 'Components/PinInput',
} satisfies Meta<typeof PinInputInput>

export default meta
type Story = StoryObj<typeof meta>

export const PinInput: Story = {
  args: {},
}
