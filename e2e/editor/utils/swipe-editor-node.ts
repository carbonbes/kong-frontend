import type { Locator, Page } from 'playwright-core'

export const swipeEditorNode = async (
  page: Page,
  node: Locator,
  direction: 'left' | 'right',
  distance = 75,
) => {
  const box = await node.boundingBox()

  if (!box) {
    throw new Error('The editor node is not visible')
  }

  const startX = box.x + box.width / 2
  const startY = box.y + box.height / 2
  const endX = startX + (direction === 'right' ? distance : -distance)

  await page.mouse.move(startX, startY)
  await page.mouse.down()
  await page.mouse.move(endX, startY, { steps: 10 })
  await page.mouse.up()
}
