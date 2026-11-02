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
  let editorNodeHoverMenuNodesListDropdownHeadingDropdownTrigger: Locator
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
    editorNodeHoverMenuNodesListDropdownHeadingDropdown = page.getByTestId(
      'editor-node-hover-menu/nodes-list-dropdown/heading-dropdown',
    )
    editorNodeHoverMenuNodesListDropdownHeadingDropdownTrigger =
      page.getByTestId(
        'editor-node-hover-menu/nodes-list-dropdown/heading-dropdown/trigger',
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
    editorNodeHoverMenuNodeActionsListDropdownTransformDropdownParagraphButton =
      page.getByTestId(
        'editor-node-hover-menu/node-actions-list-dropdown/transform-dropdown/paragraph-button',
      )
    editorNodeHoverMenuNodeActionsListDropdownTransformDropdownBulletListButton =
      page.getByTestId(
        'editor-node-hover-menu/node-actions-list-dropdown/transform-dropdown/bullet-list-button',
      )
    editorNodeHoverMenuNodeActionsListDropdownTransformDropdownOrderedListButton =
      page.getByTestId(
        'editor-node-hover-menu/node-actions-list-dropdown/transform-dropdown/ordered-list-button',
      )
    editorNodeHoverMenuNodeActionsListDropdownRemoveButton = page.getByTestId(
      'editor-node-hover-menu/node-actions-list-dropdown/remove-button',
    )

    editorNodeSwipeMenuNodesListBottomDrawer = page.getByTestId(
      'editor-node-swipe-menu/nodes-list-bottom-drawer',
    )
    editorNodeSwipeMenuNodesListBottomDrawerTitle = page.getByTestId(
      'editor-node-swipe-menu/nodes-list-bottom-drawer/title',
    )
    editorNodeSwipeMenuNodesListBottomDrawerCloseButton = page.getByTestId(
      'editor-node-swipe-menu/nodes-list-bottom-drawer/close-button',
    )
    editorNodeSwipeMenuNodesListBottomDrawerHeading2Button = page.getByTestId(
      'editor-node-swipe-menu/nodes-list-bottom-drawer/heading-2-button',
    )
    editorNodeSwipeMenuNodesListBottomDrawerHeading3Button = page.getByTestId(
      'editor-node-swipe-menu/nodes-list-bottom-drawer/heading-3-button',
    )
    editorNodeSwipeMenuNodesListBottomDrawerBulletListButton = page.getByTestId(
      'editor-node-swipe-menu/nodes-list-bottom-drawer/bullet-list-button',
    )
    editorNodeSwipeMenuNodesListBottomDrawerOrderedListButton =
      page.getByTestId(
        'editor-node-swipe-menu/nodes-list-bottom-drawer/ordered-list-button',
      )
    editorNodeSwipeMenuNodesListBottomDrawerBlockquoteButton = page.getByTestId(
      'editor-node-swipe-menu/nodes-list-bottom-drawer/blockquote-button',
    )
    editorNodeSwipeMenuNodesListBottomDrawerHorizontalRuleButton =
      page.getByTestId(
        'editor-node-swipe-menu/nodes-list-bottom-drawer/horizontal-rule-button',
      )

    editorNodeSwipeMenuNodeActionsListBottomDrawer = page.getByTestId(
      'editor-node-swipe-menu/node-actions-list-bottom-drawer',
    )
    editorNodeSwipeMenuNodeActionsListBottomDrawerTitle = page.getByTestId(
      'editor-node-swipe-menu/node-actions-list-bottom-drawer/title',
    )
    editorNodeSwipeMenuNodeActionsListBottomDrawerCloseButton =
      page.getByTestId(
        'editor-node-swipe-menu/node-actions-list-bottom-drawer/close-button',
      )
    editorNodeSwipeMenuNodeActionsListBottomDrawerMoveUpButton =
      page.getByTestId(
        'editor-node-swipe-menu/node-actions-list-bottom-drawer/move-up-button',
      )
    editorNodeSwipeMenuNodeActionsListBottomDrawerMoveDownButton =
      page.getByTestId(
        'editor-node-swipe-menu/node-actions-list-bottom-drawer/move-down-button',
      )
    editorNodeSwipeMenuNodeActionsListBottomDrawerTransformBottomDrawer =
      page.getByTestId(
        'editor-node-swipe-menu/node-actions-list-bottom-drawer/transform-bottom-drawer',
      )
    editorNodeSwipeMenuNodeActionsListBottomDrawerTransformBottomDrawerTrigger =
      page.getByTestId(
        'editor-node-swipe-menu/node-actions-list-bottom-drawer/transform-bottom-drawer/trigger',
      )
    editorNodeSwipeMenuNodeActionsListBottomDrawerTransformBottomDrawerTitle =
      page.getByTestId(
        'editor-node-swipe-menu/node-actions-list-bottom-drawer/transform-bottom-drawer/title',
      )
    editorNodeSwipeMenuNodeActionsListBottomDrawerTransformBottomDrawerCloseButton =
      page.getByTestId(
        'editor-node-swipe-menu/node-actions-list-bottom-drawer/transform-bottom-drawer/close-button',
      )
    editorNodeSwipeMenuNodeActionsListBottomDrawerTransformBottomDrawerHeading2Button =
      page.getByTestId(
        'editor-node-swipe-menu/node-actions-list-bottom-drawer/transform-bottom-drawer/heading-2-button',
      )
    editorNodeSwipeMenuNodeActionsListBottomDrawerTransformBottomDrawerHeading3Button =
      page.getByTestId(
        'editor-node-swipe-menu/node-actions-list-bottom-drawer/transform-bottom-drawer/heading-3-button',
      )
    editorNodeSwipeMenuNodeActionsListBottomDrawerTransformBottomDrawerParagraphButton =
      page.getByTestId(
        'editor-node-swipe-menu/node-actions-list-bottom-drawer/transform-bottom-drawer/paragraph-button',
      )
    editorNodeSwipeMenuNodeActionsListBottomDrawerTransformBottomDrawerBulletListButton =
      page.getByTestId(
        'editor-node-swipe-menu/node-actions-list-bottom-drawer/transform-bottom-drawer/bullet-list-button',
      )
    editorNodeSwipeMenuNodeActionsListBottomDrawerTransformBottomDrawerOrderedListButton =
      page.getByTestId(
        'editor-node-swipe-menu/node-actions-list-bottom-drawer/transform-bottom-drawer/ordered-list-button',
      )
    editorNodeSwipeMenuNodeActionsListBottomDrawerRemoveButton =
      page.getByTestId(
        'editor-node-swipe-menu/node-actions-list-bottom-drawer/remove-button',
      )

    editorTextSelectionMenu = page.getByTestId('editor-text-selection-menu')
    editorTextSelectionMenuBoldButton = page.getByTestId(
      'editor-text-selection-menu/bold-button',
    )
    editorTextSelectionMenuItalicButton = page.getByTestId(
      'editor-text-selection-menu/italic-button',
    )
    editorTextSelectionMenuStrikethroughButton = page.getByTestId(
      'editor-text-selection-menu/strikethrough-button',
    )

    editorPageFooterToast = page.getByTestId('editor-page-footer/toast')
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
})
