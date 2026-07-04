import type { Meta, StoryObj } from '@nuxtjs/storybook'
import { FormSelectTrigger } from '~/shared/ui/form'
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
  decorators: [
    () => ({
      template:
        '<div style="position: fixed; inset: 0; display: flex; align-items: center; justify-content: center;"><story/></div>',
    }),
  ],
  render: () => ({
    components: {
      FormSelectTrigger,
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
    template: `
      <SelectRoot>
        <SelectTrigger as-child>
          <FormSelectTrigger>
            <SelectValue placeholder="Вариант" />
            <SelectIcon />
          </FormSelectTrigger>
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
  title: 'Components/Select',
}

export default meta
type Story = StoryObj<typeof meta>

export const Form: Story = {}
