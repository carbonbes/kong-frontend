import type { Meta, StoryObj } from '@nuxtjs/storybook'
import { SelectIcon, SelectRoot, SelectTrigger, SelectValue } from './'
import SelectContent from './SelectContent.vue'
import SelectItem from './SelectItem.vue'
import SelectPortal from './SelectPortal.vue'
import SelectViewport from './SelectViewport.vue'

const meta = {
  component: SelectContent,
  render: (args) => ({
    components: {
      SelectIcon,
      SelectItem,
      SelectPortal,
      SelectRoot,
      SelectTrigger,
      SelectValue,
      SelectViewport,
      SelectContent,
    },
    setup() {
      return { args }
    },
    template: `
      <SelectRoot>
        <SelectTrigger class="px-4 py-2 rounded-3xl ring-2 ring-gray-200 hover:ring-blue-700">
          <SelectValue />
          <SelectIcon>
            <Icon name="tabler:chevron-down" />
          </SelectIcon>
        </SelectTrigger>
        
        <SelectPortal>
          <SelectContent>
            <SelectViewport>
              <SelectItem value="1">
                <SelectItemText>Первый</SelectItemText>
              </SelectItem>

              <SelectItem value="2">
                <SelectItemText>Второй</SelectItemText>
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
