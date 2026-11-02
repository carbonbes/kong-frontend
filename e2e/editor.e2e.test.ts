import { expect, test } from '@nuxt/test-utils/playwright'
import type { Locator } from 'playwright-core'
import { PrismaClient } from '../generated/prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

test.describe('Editor page', () => {
  let editor: Locator

  let editorNodeHoverMenu: Locator
  let editorNodeHoverMenuNodesListDropdown: Locator
  let editorNodeHoverMenuNodesListDropdownTrigger: Locator
  let editorNodeHoverMenuNodesListDropdownHeadingDropdown: Locator
  let editorNodeHoverMenuNodesListDropdownHeadingDropdownHeading2Button: Locator
  let editorNodeHoverMenuNodesListDropdownHeadingDropdownHeading3Button: Locator
  let editorNodeHoverMenuNodesListDropdownParagraphButton: Locator
  let editorNodeHoverMenuNodesListDropdownListDropdown: Locator
  let editorNodeHoverMenuNodesListDropdownListDropdownTrigger: Locator
  let editorNodeHoverMenuNodesListDropdownListDropdownBulletListButton: Locator
  let editorNodeHoverMenuNodesListDropdownListDropdownOrderedListButton: Locator
  let editorNodeHoverMenuNodesListDropdownBlockquoteButton: Locator
  let editorNodeHoverMenuNodesListDropdownHorizontalRuleButton: Locator

  let editorNodeHoverMenuNodeActionsListDropdown: Locator
  let editorNodeHoverMenuNodeActionsListDropdownTrigger: Locator
  let editorNodeHoverMenuNodeActionsListDropdownMoveUpButton: Locator
  let editorNodeHoverMenuNodeActionsListDropdownMoveDownButton: Locator
  let editorNodeHoverMenuNodeActionsListDropdownTransformDropdown: Locator
  let editorNodeHoverMenuNodeActionsListDropdownTransformDropdownTrigger: Locator
  let editorNodeHoverMenuNodeActionsListDropdownTransformDropdownHeading2Button: Locator
  let editorNodeHoverMenuNodeActionsListDropdownTransformDropdownHeading3Button: Locator
  let editorNodeHoverMenuNodeActionsListDropdownTransformDropdownParagraphButton: Locator
  let editorNodeHoverMenuNodeActionsListDropdownTransformDropdownBulletListButton: Locator
  let editorNodeHoverMenuNodeActionsListDropdownTransformDropdownOrderedListButton: Locator
  let editorNodeHoverMenuNodeActionsListDropdownRemoveButton: Locator

  let editorNodeSwipeMenuNodesListBottomDrawer: Locator
  let editorNodeSwipeMenuNodesListBottomDrawerTitle: Locator
  let editorNodeSwipeMenuNodesListBottomDrawerCloseButton: Locator
  let editorNodeSwipeMenuNodesListBottomDrawerHeading2Button: Locator
  let editorNodeSwipeMenuNodesListBottomDrawerHeading3Button: Locator
  let editorNodeSwipeMenuNodesListBottomDrawerBulletListButton: Locator
  let editorNodeSwipeMenuNodesListBottomDrawerOrderedListButton: Locator
  let editorNodeSwipeMenuNodesListBottomDrawerBlockquoteButton: Locator
  let editorNodeSwipeMenuNodesListBottomDrawerHorizontalRuleButton: Locator

  let editorNodeSwipeMenuNodeActionsListBottomDrawer: Locator
  let editorNodeSwipeMenuNodeActionsListBottomDrawerTitle: Locator
  let editorNodeSwipeMenuNodeActionsListBottomDrawerCloseButton: Locator
  let editorNodeSwipeMenuNodeActionsListBottomDrawerMoveUpButton: Locator
  let editorNodeSwipeMenuNodeActionsListBottomDrawerMoveDownButton: Locator
  let editorNodeSwipeMenuNodeActionsListBottomDrawerTransformBottomDrawer: Locator
  let editorNodeSwipeMenuNodeActionsListBottomDrawerTransformBottomDrawerTrigger: Locator
  let editorNodeSwipeMenuNodeActionsListBottomDrawerTransformBottomDrawerTitle: Locator
  let editorNodeSwipeMenuNodeActionsListBottomDrawerTransformBottomDrawerCloseButton: Locator
  let editorNodeSwipeMenuNodeActionsListBottomDrawerTransformBottomDrawerHeading2Button: Locator
  let editorNodeSwipeMenuNodeActionsListBottomDrawerTransformBottomDrawerHeading3Button: Locator
  let editorNodeSwipeMenuNodeActionsListBottomDrawerTransformBottomDrawerParagraphButton: Locator
  let editorNodeSwipeMenuNodeActionsListBottomDrawerTransformBottomDrawerBulletListButton: Locator
  let editorNodeSwipeMenuNodeActionsListBottomDrawerTransformBottomDrawerOrderedListButton: Locator
  let editorNodeSwipeMenuNodeActionsListBottomDrawerRemoveButton: Locator

  let editorTextSelectionMenu: Locator
  let editorTextSelectionMenuBoldButton: Locator
  let editorTextSelectionMenuItalicButton: Locator
  let editorTextSelectionMenuStrikethroughButton: Locator

  let editorPageFooterToast: Locator
  let editorPageFooterToastTitle: Locator
  let editorPageFooterToastLoader: Locator
  let editorPageFooterToastCheck: Locator

  let prisma: PrismaClient

  test.beforeAll(() => {
    prisma = new PrismaClient({
      adapter: new PrismaPg(
        new Pool({ connectionString: process.env.DATABASE_URL }),
      ),
    })
  })

  test.beforeEach(async ({ goto, page }) => {
    await prisma.$queryRaw`TRUNCATE TABLE articles RESTART IDENTITY CASCADE`

    await goto('/editor', { waitUntil: 'hydration' })

    editor = page.getByTestId('editor-content')

    editorNodeHoverMenu = page.getByTestId('editor-node-hover-menu')
    editorNodeHoverMenuNodesListDropdown = page.getByTestId(
      'editor-node-hover-menu/nodes-list-dropdown',
    )
    editorNodeHoverMenuNodesListDropdownTrigger = page.getByTestId(
      'editor-node-hover-menu/nodes-list-dropdown/trigger',
    )
    editorNodeHoverMenuNodesListDropdownHeadingDropdownHeading2Button =
      page.getByTestId(
        'editor-node-hover-menu/nodes-list-dropdown/heading-dropdown/heading-2-button',
      )
    editorNodeHoverMenuNodesListDropdownHeadingDropdownHeading3Button =
      page.getByTestId(
        'editor-node-hover-menu/nodes-list-dropdown/heading-dropdown/heading-3-button',
      )
    editorNodeHoverMenuNodesListDropdownParagraphButton = page.getByTestId(
      'editor-node-hover-menu/nodes-list-dropdown/paragraph-button',
    )
    editorNodeHoverMenuNodesListDropdownListDropdown = page.getByTestId(
      'editor-node-hover-menu/nodes-list-dropdown/list-dropdown',
    )
    editorNodeHoverMenuNodesListDropdownListDropdownTrigger = page.getByTestId(
      'editor-node-hover-menu/nodes-list-dropdown/list-dropdown/trigger',
    )
    editorNodeHoverMenuNodesListDropdownListDropdownBulletListButton =
      page.getByTestId(
        'editor-node-hover-menu/nodes-list-dropdown/list-dropdown/bullet-list-button',
      )
    editorNodeHoverMenuNodesListDropdownListDropdownOrderedListButton =
      page.getByTestId(
        'editor-node-hover-menu/nodes-list-dropdown/list-dropdown/ordered-list-button',
      )
    editorNodeHoverMenuNodesListDropdownBlockquoteButton = page.getByTestId(
      'editor-node-hover-menu/nodes-list-dropdown/blockquote-button',
    )
    editorNodeHoverMenuNodesListDropdownHorizontalRuleButton = page.getByTestId(
      'editor-node-hover-menu/nodes-list-dropdown/horizontal-rule-button',
    )

    editorNodeHoverMenuNodeActionsListDropdown = page.getByTestId(
      'editor-node-hover-menu/node-actions-list-dropdown',
    )
    editorNodeHoverMenuNodeActionsListDropdownTrigger = page.getByTestId(
      'editor-node-hover-menu/node-actions-list-dropdown/trigger',
    )
    editorNodeHoverMenuNodeActionsListDropdownMoveUpButton = page.getByTestId(
      'editor-node-hover-menu/node-actions-list-dropdown/move-up-button',
    )
    editorNodeHoverMenuNodeActionsListDropdownMoveDownButton = page.getByTestId(
      'editor-node-hover-menu/node-actions-list-dropdown/move-down-button',
    )
    editorNodeHoverMenuNodeActionsListDropdownTransformDropdown =
      page.getByTestId(
        'editor-node-hover-menu/node-actions-list-dropdown/transform-dropdown',
      )
    editorNodeHoverMenuNodeActionsListDropdownTransformDropdownTrigger =
      page.getByTestId(
        'editor-node-hover-menu/node-actions-list-dropdown/transform-dropdown/trigger',
      )
    editorNodeHoverMenuNodeActionsListDropdownTransformDropdownHeading2Button =
      page.getByTestId(
        'editor-node-hover-menu/node-actions-list-dropdown/transform-dropdown/heading-2-button',
      )
    editorNodeHoverMenuNodeActionsListDropdownTransformDropdownHeading3Button =
      page.getByTestId(
        'editor-node-hover-menu/node-actions-list-dropdown/transform-dropdown/heading-3-button',
      )
  })
})
