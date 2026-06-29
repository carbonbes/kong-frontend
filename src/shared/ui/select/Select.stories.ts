import type { Meta, StoryObj } from '@nuxtjs/storybook'
import {
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectIcon,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from './'

const meta = {
  component: SelectContent,
  render: (args) => ({
    components: {
      SelectContent,
      SelectItem,
      SelectItemIndicator,
      SelectItemText,
      SelectIcon,
      SelectPortal,
      SelectRoot,
      SelectTrigger,
      SelectValue,
      SelectViewport,
    },
    setup() {
      return { args }
    },
    template: `
      <SelectRoot>
        <SelectTrigger>
          <SelectValue placeholder="Вариант" />
          <SelectIcon />
        </SelectTrigger>
        
        <SelectPortal>
          <SelectContent>
            <SelectViewport>
              <SelectItem value="first">
                <SelectItemText>Первый</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>

              <SelectItem value="second">
                <SelectItemText>Второй</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>

              <SelectItem value="third">
                <SelectItemText>Третий</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
            </SelectViewport>
          </SelectContent>
        </SelectPortal>
      </SelectRoot>
    `,
  }),
  title: 'Select',
} satisfies Meta<typeof SelectContent>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {},
}
