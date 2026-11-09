import { expect, test } from '@nuxt/test-utils/playwright'
import type { Locator } from 'playwright-core'
import { PrismaClient } from '../../generated/prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { swipeEditorNode } from './utils'
import { authentication, createArticle } from '../utils'

test.describe('Editor page', () => {
  let editor: Locator

  let nodeHoverMenu: Locator

  let nodesListDropdown: Locator
  let nodesListDropdownTrigger: Locator
  let headingNodesListDropdown: Locator
  let headingNodesListDropdownTrigger: Locator
  let headingNodesListDropdownInsertHeading2Button: Locator
  let headingNodesListDropdownInsertHeading3Button: Locator
  let nodesListDropdownInsertParagraphButton: Locator
  let listNodesListDropdown: Locator
  let listNodesListDropdownTrigger: Locator
  let listNodesListDropdownInsertBulletListButton: Locator
  let listNodesListDropdownInsertOrderedListButton: Locator
  let nodesListDropdownInsertBlockquoteButton: Locator
  let nodesListDropdownInsertHorizontalRuleButton: Locator

  let nodeActionsListDropdown: Locator
  let nodeActionsListDropdownTrigger: Locator
  let nodeActionsListDropdownMoveUpButton: Locator
  let nodeActionsListDropdownMoveDownButton: Locator
  let transformNodesListDropdown: Locator
  let transformNodesListDropdownTrigger: Locator
  let transformNodesListDropdownTransformToHeading2Button: Locator
  let transformNodesListDropdownTransformToHeading3Button: Locator
  let transformNodesListDropdownTransformToParagraphButton: Locator
  let transformNodesListDropdownTransformToBulletListButton: Locator
  let transformNodesListDropdownTransformToOrderedListButton: Locator
  let nodeActionsListDropdownRemoveButton: Locator

  let nodesListBottomDrawer: Locator
  let nodesListBottomDrawerCloseButton: Locator
  let nodesListBottomDrawerInsertHeading2Button: Locator
  let nodesListBottomDrawerInsertHeading3Button: Locator
  let nodesListBottomDrawerInsertParagraphButton: Locator
  let nodesListBottomDrawerInsertBulletListButton: Locator
  let nodesListBottomDrawerInsertOrderedListButton: Locator
  let nodesListBottomDrawerInsertBlockquoteButton: Locator
  let nodesListBottomDrawerInsertHorizontalRuleButton: Locator

  let nodeActionsListBottomDrawer: Locator
  let nodeActionsListBottomDrawerTitle: Locator
  let nodeActionsListBottomDrawerCloseButton: Locator
  let nodeActionsListBottomDrawerMoveUpButton: Locator
  let nodeActionsListBottomDrawerMoveDownButton: Locator
  let transformNodesListBottomDrawer: Locator
  let transformNodesListBottomDrawerTrigger: Locator
  let transformNodesListBottomDrawerCloseButton: Locator
  let transformNodesListBottomDrawerTransformToHeading2Button: Locator
  let transformNodesListBottomDrawerTransformToHeading3Button: Locator
  let transformNodesListBottomDrawerTransformToParagraphButton: Locator
  let transformNodesListBottomDrawerTransformToBulletListButton: Locator
  let transformNodesListBottomDrawerTransformToOrderedListButton: Locator
  let nodeActionsListBottomDrawerRemoveButton: Locator

  let textSelectionMenu: Locator
  let textSelectionMenuBoldButton: Locator
  let textSelectionMenuItalicButton: Locator
  let textSelectionMenuStrikethroughButton: Locator

  let editorPageFooterToastTitle: Locator
  let editorPageFooterToastLoader: Locator
  let editorPageFooterToastCheck: Locator

  let prisma: PrismaClient

  test.beforeAll(async () => {
    prisma = new PrismaClient({
      adapter: new PrismaPg(
        new Pool({ connectionString: process.env.DATABASE_URL }),
      ),
    })
  })

  test.beforeEach(async ({ page }) => {
    await authentication(prisma, page)

    await prisma.$queryRaw`TRUNCATE TABLE articles RESTART IDENTITY CASCADE`

    editor = page.getByTestId('editor-content')

    nodeHoverMenu = page.getByTestId('editor-node-hover-menu')

    nodesListDropdown = page.getByTestId('nodes-list-dropdown')
    nodesListDropdownTrigger = page.getByTestId('nodes-list-dropdown/trigger')
    headingNodesListDropdown = page.getByTestId('heading-nodes-list-dropdown')
    headingNodesListDropdownTrigger = page.getByTestId(
      'heading-nodes-list-dropdown/trigger',
    )
    headingNodesListDropdownInsertHeading2Button = page.getByTestId(
      'heading-nodes-list-dropdown/insert-heading-2-button',
    )
    headingNodesListDropdownInsertHeading3Button = page.getByTestId(
      'heading-nodes-list-dropdown/insert-heading-3-button',
    )
    nodesListDropdownInsertParagraphButton = page.getByTestId(
      'nodes-list-dropdown/insert-paragraph-button',
    )
    listNodesListDropdown = page.getByTestId('list-nodes-list-dropdown')
    listNodesListDropdownTrigger = page.getByTestId(
      'list-nodes-list-dropdown/trigger',
    )
    listNodesListDropdownInsertBulletListButton = page.getByTestId(
      'list-nodes-list-dropdown/insert-bullet-list-button',
    )
    listNodesListDropdownInsertOrderedListButton = page.getByTestId(
      'list-nodes-list-dropdown/insert-ordered-list-button',
    )
    nodesListDropdownInsertBlockquoteButton = page.getByTestId(
      'nodes-list-dropdown/insert-blockquote-button',
    )
    nodesListDropdownInsertHorizontalRuleButton = page.getByTestId(
      'nodes-list-dropdown/insert-horizontal-rule-button',
    )

    nodeActionsListDropdown = page.getByTestId('node-actions-list-dropdown')
    nodeActionsListDropdownTrigger = page.getByTestId(
      'node-actions-list-dropdown/trigger',
    )
    nodeActionsListDropdownMoveUpButton = page.getByTestId(
      'node-actions-list-dropdown/move-up-button',
    )
    nodeActionsListDropdownMoveDownButton = page.getByTestId(
      'node-actions-list-dropdown/move-down-button',
    )
    transformNodesListDropdown = page.getByTestId(
      'transform-nodes-list-dropdown',
    )
    transformNodesListDropdownTrigger = page.getByTestId(
      'transform-nodes-list-dropdown/trigger',
    )
    transformNodesListDropdownTransformToHeading2Button = page.getByTestId(
      'transform-nodes-list-dropdown/transform-to-heading-2-button',
    )
    transformNodesListDropdownTransformToHeading3Button = page.getByTestId(
      'transform-nodes-list-dropdown/transform-to-heading-3-button',
    )
    transformNodesListDropdownTransformToParagraphButton = page.getByTestId(
      'transform-nodes-list-dropdown/transform-to-paragraph-button',
    )
    transformNodesListDropdownTransformToBulletListButton = page.getByTestId(
      'transform-nodes-list-dropdown/transform-to-bullet-list-button',
    )
    transformNodesListDropdownTransformToOrderedListButton = page.getByTestId(
      'transform-nodes-list-dropdown/transform-to-ordered-list-button',
    )
    nodeActionsListDropdownRemoveButton = page.getByTestId(
      'node-actions-list-dropdown/remove-button',
    )

    nodesListBottomDrawer = page.getByTestId('nodes-list-bottom-drawer')
    nodesListBottomDrawerCloseButton = page.getByTestId(
      'nodes-list-bottom-drawer/close-button',
    )
    nodesListBottomDrawerInsertHeading2Button = page.getByTestId(
      'nodes-list-bottom-drawer/insert-heading-2-button',
    )
    nodesListBottomDrawerInsertHeading3Button = page.getByTestId(
      'nodes-list-bottom-drawer/insert-heading-3-button',
    )
    nodesListBottomDrawerInsertParagraphButton = page.getByTestId(
      'nodes-list-bottom-drawer/insert-paragraph-button',
    )
    nodesListBottomDrawerInsertBulletListButton = page.getByTestId(
      'nodes-list-bottom-drawer/insert-bullet-list-button',
    )
    nodesListBottomDrawerInsertOrderedListButton = page.getByTestId(
      'nodes-list-bottom-drawer/insert-ordered-list-button',
    )
    nodesListBottomDrawerInsertBlockquoteButton = page.getByTestId(
      'nodes-list-bottom-drawer/insert-blockquote-button',
    )
    nodesListBottomDrawerInsertHorizontalRuleButton = page.getByTestId(
      'nodes-list-bottom-drawer/insert-horizontal-rule-button',
    )

    nodeActionsListBottomDrawer = page.getByTestId(
      'node-actions-list-bottom-drawer',
    )
    nodeActionsListBottomDrawerTitle = page.getByTestId(
      'node-actions-list-bottom-drawer/title',
    )
    nodeActionsListBottomDrawerCloseButton = page.getByTestId(
      'node-actions-list-bottom-drawer/close-button',
    )
    nodeActionsListBottomDrawerMoveUpButton = page.getByTestId(
      'node-actions-list-bottom-drawer/move-up-button',
    )
    nodeActionsListBottomDrawerMoveDownButton = page.getByTestId(
      'node-actions-list-bottom-drawer/move-down-button',
    )
    transformNodesListBottomDrawer = page.getByTestId(
      'transform-nodes-list-bottom-drawer',
    )
    transformNodesListBottomDrawerTrigger = page.getByTestId(
      'transform-nodes-list-bottom-drawer/trigger',
    )
    transformNodesListBottomDrawerCloseButton = page.getByTestId(
      'transform-nodes-list-bottom-drawer/close-button',
    )
    transformNodesListBottomDrawerTransformToHeading2Button = page.getByTestId(
      'transform-nodes-list-bottom-drawer/transform-to-heading-2-button',
    )
    transformNodesListBottomDrawerTransformToHeading3Button = page.getByTestId(
      'transform-nodes-list-bottom-drawer/transform-to-heading-3-button',
    )
    transformNodesListBottomDrawerTransformToParagraphButton = page.getByTestId(
      'transform-nodes-list-bottom-drawer/transform-to-paragraph-button',
    )
    transformNodesListBottomDrawerTransformToBulletListButton =
      page.getByTestId(
        'transform-nodes-list-bottom-drawer/transform-to-bullet-list-button',
      )
    transformNodesListBottomDrawerTransformToOrderedListButton =
      page.getByTestId(
        'transform-nodes-list-bottom-drawer/transform-to-ordered-list-button',
      )
    nodeActionsListBottomDrawerRemoveButton = page.getByTestId(
      'node-actions-list-bottom-drawer/remove-button',
    )

    textSelectionMenu = page.getByTestId('text-selection-menu')
    textSelectionMenuBoldButton = page.getByTestId(
      'text-selection-menu/bold-button',
    )
    textSelectionMenuItalicButton = page.getByTestId(
      'text-selection-menu/italic-button',
    )
    textSelectionMenuStrikethroughButton = page.getByTestId(
      'text-selection-menu/strikethrough-button',
    )

    editorPageFooterToastTitle = page.getByTestId(
      'editor-page-footer/toast/title',
    )
    editorPageFooterToastLoader = page.getByTestId(
      'editor-page-footer/toast/loader',
    )
    editorPageFooterToastCheck = page.getByTestId(
      'editor-page-footer/toast/check',
    )
  })

  test(
    'should be create an article',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto, page }) => {
      await goto('/editor', { waitUntil: 'hydration' })

      await editor.click()
      await editor.fill('Привет, мир!')

      await expect(editorPageFooterToastCheck).toBeVisible()

      await expect(page).toHaveURL('/editor?id=1')
      await expect(editor).toContainText('Привет, мир!')
    },
  )

  test(
    'should be edit the existing article',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto, page }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await expect(editor).toContainText('Привет, мир!')

      await editor.click()

      await page.keyboard.press('End+Enter')
      await page.keyboard.type('Как твои дела?')

      await expect(editorPageFooterToastTitle).toContainText('Сохранение')
      await expect(editorPageFooterToastLoader).toBeVisible()

      await expect(editorPageFooterToastTitle).toContainText('Сохранено')
      await expect(editorPageFooterToastCheck).toBeVisible()
    },
  )

  test(
    'should be show and hide a node hover-menu',
    { tag: '@desktop' },
    async ({ goto, page }) => {
      await goto('/editor', { waitUntil: 'hydration' })

      await editor.locator('p').hover()

      await expect(nodeHoverMenu).toBeVisible()

      await page.locator('body').hover()

      await expect(nodeHoverMenu).not.toBeVisible()
    },
  )

  test(
    'should be open and close a nodes-list dropdown',
    { tag: '@desktop' },
    async ({ goto, page }) => {
      await goto('/editor', { waitUntil: 'hydration' })

      await editor.locator('p').hover()

      await nodesListDropdownTrigger.click()

      await expect(nodesListDropdown).toBeVisible()

      await page.locator('body').click({ force: true })

      await expect(nodesListDropdown).not.toBeVisible()
    },
  )

  test(
    'should be open and close a heading-dropdown',
    { tag: '@desktop' },
    async ({ goto }) => {
      await goto('/editor', { waitUntil: 'hydration' })

      await editor.locator('p').hover()
      await nodesListDropdownTrigger.click()
      await headingNodesListDropdownTrigger.hover()

      await expect(headingNodesListDropdown).toBeVisible()

      await nodesListDropdown.hover()

      await expect(headingNodesListDropdown).not.toBeVisible()
    },
  )

  test(
    'should be insert a heading-2 node from nodes-list dropdown',
    { tag: '@desktop' },
    async ({ goto }) => {
      await goto('/editor', { waitUntil: 'hydration' })

      await editor.locator('p').hover()
      await nodesListDropdownTrigger.click()
      await headingNodesListDropdownTrigger.hover()
      await headingNodesListDropdownInsertHeading2Button.click()

      await expect(headingNodesListDropdown).not.toBeVisible()
      await expect(nodesListDropdown).not.toBeVisible()
      await expect(editor.locator('h2')).toHaveCount(1)
    },
  )

  test(
    'should be insert a heading-3 node from nodes-list dropdown',
    { tag: '@desktop' },
    async ({ goto }) => {
      await goto('/editor', { waitUntil: 'hydration' })

      await editor.locator('p').hover()
      await nodesListDropdownTrigger.click()
      await headingNodesListDropdownTrigger.hover()
      await headingNodesListDropdownInsertHeading3Button.click()

      await expect(headingNodesListDropdown).not.toBeVisible()
      await expect(nodesListDropdown).not.toBeVisible()
      await expect(editor.locator('h3')).toHaveCount(1)
    },
  )

  test(
    'should be insert a paragraph node from nodes-list dropdown',
    { tag: '@desktop' },
    async ({ goto }) => {
      await goto('/editor', { waitUntil: 'hydration' })

      await editor.locator('p').hover()
      await nodesListDropdownTrigger.click()
      await nodesListDropdownInsertParagraphButton.click()

      await expect(nodesListDropdown).not.toBeVisible()
      await expect(editor.locator('p')).toHaveCount(2)
    },
  )

  test(
    'should be insert a bullet-list node from nodes-list dropdown',
    { tag: '@desktop' },
    async ({ goto }) => {
      await goto('/editor', { waitUntil: 'hydration' })

      await editor.locator('p').hover()
      await nodesListDropdownTrigger.click()
      await listNodesListDropdownTrigger.hover()
      await listNodesListDropdownInsertBulletListButton.click()

      await expect(listNodesListDropdown).not.toBeVisible()
      await expect(nodesListDropdown).not.toBeVisible()
      await expect(editor.locator('ul > li')).toHaveCount(1)
    },
  )

  test(
    'should be insert an ordered-list node from nodes-list dropdown',
    { tag: '@desktop' },
    async ({ goto }) => {
      await goto('/editor', { waitUntil: 'hydration' })

      await editor.locator('p').hover()
      await nodesListDropdownTrigger.click()
      await listNodesListDropdownTrigger.hover()
      await listNodesListDropdownInsertOrderedListButton.click()

      await expect(listNodesListDropdown).not.toBeVisible()
      await expect(nodesListDropdown).not.toBeVisible()
      await expect(editor.locator('ol > li')).toHaveCount(1)
    },
  )

  test(
    'should be insert a blockquote node from nodes-list dropdown',
    { tag: '@desktop' },
    async ({ goto }) => {
      await goto('/editor', { waitUntil: 'hydration' })

      await editor.locator('p').hover()
      await nodesListDropdownTrigger.click()
      await nodesListDropdownInsertBlockquoteButton.click()

      await expect(nodesListDropdown).not.toBeVisible()
      await expect(editor.locator('blockquote')).toHaveCount(1)
    },
  )

  test(
    'should be insert a horizontal-rule node from nodes-list dropdown',
    { tag: '@desktop' },
    async ({ goto }) => {
      await goto('/editor', { waitUntil: 'hydration' })

      await editor.locator('p').hover()
      await nodesListDropdownTrigger.click()
      await nodesListDropdownInsertHorizontalRuleButton.click()

      await expect(nodesListDropdown).not.toBeVisible()
      await expect(editor.locator('hr')).toHaveCount(1)
    },
  )

  test(
    'should be open and close a list-nodes-list dropdown',
    { tag: '@desktop' },
    async ({ goto }) => {
      await goto('/editor', { waitUntil: 'hydration' })

      await editor.locator('p').hover()
      await nodesListDropdownTrigger.click()
      await listNodesListDropdownTrigger.hover()

      await expect(listNodesListDropdown).toBeVisible()

      await nodesListDropdown.locator('[role="menuitem"]').first().hover()

      await expect(listNodesListDropdown).not.toBeVisible()
    },
  )

  test(
    'should be open and close a node-actions-list dropdown',
    { tag: '@desktop' },
    async ({ goto, page }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await editor.locator('p').hover()

      await nodeActionsListDropdownTrigger.click()

      await expect(nodeActionsListDropdown).toBeVisible()

      await page.locator('body').click({ force: true })

      await expect(nodeActionsListDropdown).not.toBeVisible()
    },
  )

  test(
    'should be move a node up from node-actions-list dropdown',
    { tag: '@desktop' },
    async ({ goto }) => {
      await createArticle(prisma, ['Первый узел', 'Второй узел'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await expect(editor.locator('p').first()).toContainText('Первый узел')

      await editor.locator('p').nth(1).hover()
      await nodeActionsListDropdownTrigger.click()
      await nodeActionsListDropdownMoveUpButton.click()

      await expect(nodeActionsListDropdown).not.toBeVisible()
      await expect(editor.locator('p').first()).toContainText('Второй узел')
    },
  )

  test(
    'should be move a node down from node-actions-list dropdown',
    { tag: '@desktop' },
    async ({ goto }) => {
      await createArticle(prisma, ['Первый узел', 'Второй узел'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await expect(editor.locator('p').first()).toContainText('Первый узел')

      await editor.locator('p').first().hover()
      await nodeActionsListDropdownTrigger.click()
      await nodeActionsListDropdownMoveDownButton.click()

      await expect(nodeActionsListDropdown).not.toBeVisible()
      await expect(editor.locator('p').first()).toContainText('Второй узел')
    },
  )

  test(
    'should be transform a node to a heading-2 node from transform-nodes-list-dropdown',
    { tag: '@desktop' },
    async ({ goto }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await editor.locator('p').hover()
      await nodeActionsListDropdownTrigger.click()
      await transformNodesListDropdownTrigger.hover()
      await transformNodesListDropdownTransformToHeading2Button.click()

      await expect(transformNodesListDropdown).not.toBeVisible()
      await expect(nodeActionsListDropdown).not.toBeVisible()
      await expect(editor.locator('h2')).toContainText('Привет, мир!')
    },
  )

  test(
    'should be transform a node to a heading-3 node from transform-nodes-list-dropdown',
    { tag: '@desktop' },
    async ({ goto }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await editor.locator('p').hover()
      await nodeActionsListDropdownTrigger.click()
      await transformNodesListDropdownTrigger.hover()
      await transformNodesListDropdownTransformToHeading3Button.click()

      await expect(transformNodesListDropdown).not.toBeVisible()
      await expect(nodeActionsListDropdown).not.toBeVisible()
      await expect(editor.locator('h3')).toContainText('Привет, мир!')
    },
  )

  test(
    'should be transform a heading-2 node to a paragraph from transform-nodes-list-dropdown',
    { tag: '@desktop' },
    async ({ goto }) => {
      await createArticle(prisma, [
        { type: 'heading', level: 2, text: 'Привет, мир!' },
      ])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await editor.locator('h2').hover()
      await nodeActionsListDropdownTrigger.click()
      await transformNodesListDropdownTrigger.hover()
      await transformNodesListDropdownTransformToParagraphButton.click()

      await expect(transformNodesListDropdown).not.toBeVisible()
      await expect(nodeActionsListDropdown).not.toBeVisible()
      await expect(editor.locator('p:not([data-placeholder])')).toContainText(
        'Привет, мир!',
      )
    },
  )

  test(
    'should be transform a node to a bullet-list node from transform-nodes-list-dropdown',
    { tag: '@desktop' },
    async ({ goto }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await editor.locator('p').hover()
      await nodeActionsListDropdownTrigger.click()
      await transformNodesListDropdownTrigger.hover()
      await transformNodesListDropdownTransformToBulletListButton.click()

      await expect(transformNodesListDropdown).not.toBeVisible()
      await expect(nodeActionsListDropdown).not.toBeVisible()
      await expect(editor.locator('ul')).toContainText('Привет, мир!')
    },
  )

  test(
    'should be transform a node to an ordered-list node from transform-nodes-list-dropdown',
    { tag: '@desktop' },
    async ({ goto }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await editor.locator('p').hover()
      await nodeActionsListDropdownTrigger.click()
      await transformNodesListDropdownTrigger.hover()
      await transformNodesListDropdownTransformToOrderedListButton.click()

      await expect(transformNodesListDropdown).not.toBeVisible()
      await expect(nodeActionsListDropdown).not.toBeVisible()
      await expect(editor.locator('ol')).toContainText('Привет, мир!')
    },
  )

  test(
    'should be remove a node from node-actions-list dropdown',
    { tag: '@desktop' },
    async ({ goto }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await editor.locator('p').hover()
      await nodeActionsListDropdownTrigger.click()
      await nodeActionsListDropdownRemoveButton.click()

      await expect(nodeActionsListDropdown).not.toBeVisible()
      await expect(editor).not.toContainText('Привет, мир!')
    },
  )

  test(
    'should be show and hide a text-selection menu',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await editor.locator('p').selectText()

      await expect(textSelectionMenu).toBeVisible()

      await editor.click()

      await expect(textSelectionMenu).not.toBeVisible()
    },
  )

  test(
    'should be toggle a bold mark on the selected text',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await editor.locator('p').selectText()
      await textSelectionMenuBoldButton.click()

      await expect(editor.locator('strong')).toContainText('Привет, мир!')

      await textSelectionMenuBoldButton.click()

      await expect(editor.locator('strong')).toHaveCount(0)
    },
  )

  test(
    'should be toggle an italic mark on the selected text',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await editor.locator('p').selectText()
      await textSelectionMenuItalicButton.click()

      await expect(editor.locator('em')).toContainText('Привет, мир!')

      await textSelectionMenuItalicButton.click()

      await expect(editor.locator('em')).toHaveCount(0)
    },
  )

  test(
    'should be toggle a strikethrough mark on the selected text',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await editor.locator('p').selectText()
      await textSelectionMenuStrikethroughButton.click()

      await expect(editor.locator('s')).toContainText('Привет, мир!')

      await textSelectionMenuStrikethroughButton.click()

      await expect(editor.locator('s')).toHaveCount(0)
    },
  )

  test(
    'should be not open a nodes-list bottom-drawer after swiping a node to the right less than the trigger threshold',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await goto('/editor', { waitUntil: 'hydration' })

      await swipeEditorNode(page, editor.locator('p'), 'right', 74)

      await expect(nodesListBottomDrawer).not.toBeVisible()
    },
  )

  test(
    'should be open a nodes-list bottom-drawer after swiping a node to the right larger than the trigger threshold',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await goto('/editor', { waitUntil: 'hydration' })

      await swipeEditorNode(page, editor.locator('p'), 'right', 76)

      await page.waitForTimeout(333)

      await expect(nodesListBottomDrawer).toBeVisible()
    },
  )

  test(
    'should be not open a nodes-list bottom-drawer after a short swipe',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await swipeEditorNode(page, editor.locator('p'), 'right', 40)

      await expect(nodesListBottomDrawer).not.toBeVisible()
    },
  )

  test(
    'should be open a node-actions-list bottom-drawer after swiping a node to the left',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await swipeEditorNode(page, editor.locator('p'), 'left')

      await expect(nodeActionsListBottomDrawer).toBeVisible()
      await expect(nodeActionsListBottomDrawerTitle).toContainText(
        'Настройки узла',
      )
    },
  )

  test(
    'should be close a nodes-list bottom-drawer after press on close-button',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await swipeEditorNode(page, editor.locator('p'), 'right')

      await expect(nodesListBottomDrawer).toBeVisible()

      await nodesListBottomDrawerCloseButton.click()

      await expect(nodesListBottomDrawer).not.toBeVisible()
    },
  )

  test(
    'should be close a node-actions-list bottom-drawer after press on close-button',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await swipeEditorNode(page, editor.locator('p'), 'left')

      await expect(nodeActionsListBottomDrawer).toBeVisible()

      await nodeActionsListBottomDrawerCloseButton.click()

      await expect(nodeActionsListBottomDrawer).not.toBeVisible()
    },
  )

  test(
    'should be insert a heading-2 node from nodes-list-bottom-drawer',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await swipeEditorNode(page, editor.locator('p'), 'right')
      await nodesListBottomDrawerInsertHeading2Button.tap()

      await expect(editor.locator('h2')).toHaveCount(1)
    },
  )

  test(
    'should be insert a heading-3 node from nodes-list-bottom-drawer',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await swipeEditorNode(page, editor.locator('p'), 'right')
      await nodesListBottomDrawerInsertHeading3Button.tap()

      await expect(editor.locator('h3')).toHaveCount(1)
    },
  )

  test(
    'should be insert a paragraph node from nodes-list bottom-drawer',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await swipeEditorNode(page, editor.locator('p'), 'right')
      await nodesListBottomDrawerInsertParagraphButton.tap()

      await expect(editor.locator('p')).toHaveCount(2)
    },
  )

  test(
    'should be insert a bullet-list node from nodes-list bottom-drawer',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await swipeEditorNode(page, editor.locator('p'), 'right')
      await nodesListBottomDrawerInsertBulletListButton.tap()

      await expect(editor.locator('ul > li')).toHaveCount(1)
    },
  )

  test(
    'should be insert an ordered-list node from nodes-list bottom-drawer',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await goto('/editor', { waitUntil: 'hydration' })

      await swipeEditorNode(page, editor.locator('p'), 'right')
      await nodesListBottomDrawerInsertOrderedListButton.tap()

      await expect(editor.locator('ol > li')).toHaveCount(1)
    },
  )

  test(
    'should be insert a blockquote node from nodes-list-bottom-drawer',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await goto('/editor', { waitUntil: 'hydration' })

      await swipeEditorNode(
        page,
        editor.locator('p[data-placeholder]'),
        'right',
      )
      await nodesListBottomDrawerInsertBlockquoteButton.tap()

      await expect(editor.locator('blockquote')).toHaveCount(1)
    },
  )

  test(
    'should be insert a horizontal-rule node from nodes-list-bottom-drawer',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await goto('/editor', { waitUntil: 'hydration' })

      await swipeEditorNode(page, editor.locator('p'), 'right')
      await nodesListBottomDrawer.dragTo(page.locator('body'), {
        targetPosition: { x: 0, y: 50 },
      })
      await nodesListBottomDrawerInsertHorizontalRuleButton.tap()

      await expect(
        editor.locator('div[data-type="horizontalRule"]'),
      ).toHaveCount(1)
    },
  )

  test(
    'should be move a node up from node-actions-list-bottom-drawer',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await createArticle(prisma, ['Первый узел', 'Второй узел'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await expect(editor.locator('p').first()).toContainText('Первый узел')

      await swipeEditorNode(page, editor.locator('p').nth(1), 'left')
      await nodeActionsListBottomDrawerMoveUpButton.tap()

      await expect(editor.locator('p').first()).toContainText('Второй узел')
    },
  )

  test(
    'should be move a node down from node-actions-list-bottom-drawer',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await createArticle(prisma, ['Первый узел', 'Второй узел'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await expect(editor.locator('p').first()).toContainText('Первый узел')

      await swipeEditorNode(page, editor.locator('p').first(), 'left')
      await nodeActionsListBottomDrawerMoveDownButton.tap()

      await expect(editor.locator('p').first()).toContainText('Второй узел')
    },
  )

  test(
    'should be open and close a transform-nodes-list-bottom-drawer',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await goto('/editor', { waitUntil: 'hydration' })

      await swipeEditorNode(page, editor.locator('p'), 'left')
      await transformNodesListBottomDrawerTrigger.tap()
      await transformNodesListBottomDrawerCloseButton.tap()

      await expect(transformNodesListBottomDrawer).not.toBeVisible()
    },
  )

  test(
    'should be transform a node to a heading-2 node from transform-nodes-list-bottom-drawer',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await swipeEditorNode(page, editor.locator('p'), 'left')
      await transformNodesListBottomDrawerTrigger.tap()
      await transformNodesListBottomDrawerTransformToHeading2Button.tap()

      await expect(nodeActionsListBottomDrawer).not.toBeVisible()
      await expect(editor.locator('h2')).toContainText('Привет, мир!')
    },
  )

  test(
    'should be transform a node to a heading-3 node from transform-nodes-list-bottom-drawer',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await swipeEditorNode(page, editor.locator('p'), 'left')
      await transformNodesListBottomDrawerTrigger.tap()
      await transformNodesListBottomDrawerTransformToHeading3Button.tap()

      await expect(nodeActionsListBottomDrawer).not.toBeVisible()
      await expect(editor.locator('h3')).toContainText('Привет, мир!')
    },
  )

  test(
    'should be transform a heading-2 node to a paragraph from transform transform-nodes-list-bottom-drawer',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await createArticle(prisma, [
        { type: 'heading', level: 2, text: 'Привет, мир!' },
      ])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await expect(editor.locator('h2')).toContainText('Привет, мир!')

      await swipeEditorNode(page, editor.locator('h2'), 'left')
      await transformNodesListBottomDrawerTrigger.tap()
      await transformNodesListBottomDrawerTransformToParagraphButton.tap()

      await expect(nodeActionsListBottomDrawer).not.toBeVisible()
      await expect(editor.locator('p:not([data-placeholder])')).toContainText(
        'Привет, мир!',
      )
    },
  )

  test(
    'should be transform a node to a bullet-list node from transform-nodes-list-bottom-drawer',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await swipeEditorNode(page, editor.locator('p'), 'left')
      await transformNodesListBottomDrawerTrigger.tap()
      await transformNodesListBottomDrawerTransformToBulletListButton.tap()

      await expect(nodeActionsListBottomDrawer).not.toBeVisible()
      await expect(editor.locator('ul')).toContainText('Привет, мир!')
    },
  )

  test(
    'should be transform a node to an ordered-list node from transform-nodes-list-bottom-drawer',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await swipeEditorNode(page, editor.locator('p'), 'left')
      await transformNodesListBottomDrawerTrigger.tap()
      await transformNodesListBottomDrawerTransformToOrderedListButton.tap()

      await expect(nodeActionsListBottomDrawer).not.toBeVisible()
      await expect(editor.locator('ol')).toContainText('Привет, мир!')
    },
  )

  test(
    'should be remove a node from node-actions-list-bottom-drawer',
    { tag: '@mobile' },
    async ({ goto, page }) => {
      await createArticle(prisma, ['Привет, мир!'])

      await goto('/editor?id=1', { waitUntil: 'hydration' })

      await swipeEditorNode(page, editor.locator('p'), 'left')
      await nodeActionsListBottomDrawerRemoveButton.tap()

      await expect(editor).not.toContainText('Привет, мир!')
    },
  )
})
