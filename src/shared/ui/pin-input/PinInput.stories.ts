import type { Meta, StoryObj } from '@nuxtjs/storybook'
import { PinInputInput, PinInputRoot } from './'

const meta = {
  decorators: [
    () => ({
      template:
        '<div style="position: fixed; inset: 0; display: flex; align-items: center; justify-content: center;"><story/></div>',
    }),
  ],
  render: () => ({
    components: {
      PinInputInput,
      PinInputRoot,
    },
    template: `
      <PinInputRoot>
        <PinInputInput v-for="(key, index) in 6" :key :index />
      </PinInputRoot>
    `,
  }),
  title: 'Components/PinInput',
}

export default meta
type Story = StoryObj<typeof meta>

export const PinInput: Story = {}
