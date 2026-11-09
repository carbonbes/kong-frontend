import { expect, test } from '@nuxt/test-utils/playwright'
import type { Locator } from 'playwright-core'
import { PrismaClient } from '../../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { authentication, createArticle } from '../utils'
import { getFormattedDate } from '../feed/utils/get-formatted-date'
import { createRichArticle, truncateArticles } from './utils'

test.describe('Article page', () => {
  let articleHeaderCreatedAt: Locator
  let articleHeaderDropdownMenuContent: Locator
  let articleHeaderDropdownMenuTrigger: Locator
  let articleHeaderDropdownMenuEditButton: Locator
  let articleHeaderDropdownMenuRemoveButton: Locator

  let articlePageEditorContent: Locator

  let contentParagraph: Locator
  let contentRichParagraph: Locator
  let contentBold: Locator
  let contentItalic: Locator
  let contentStrike: Locator
  let contentHeading2: Locator
  let contentHeading3: Locator
  let contentBlockquote: Locator
  let contentBulletList: Locator
  let contentOrderedList: Locator
  let articleContentHorizontalRule: Locator

  let articlePageSuccessToast: Locator
  let articlePageDangerToast: Locator

  let feedPageArticleCard: Locator

  let prisma: PrismaClient

  test.beforeAll(async () => {
    prisma = new PrismaClient({
      adapter: new PrismaPg(
        new Pool({ connectionString: process.env.DATABASE_URL }),
      ),
    })
  })

  test.beforeEach(async ({ page }) => {
    await truncateArticles(prisma)
    await authentication(prisma, page)

    articleHeaderCreatedAt = page.getByTestId('article-header/created-at')
    articleHeaderDropdownMenuContent = page.getByTestId(
      'article-header/dropdown-menu/content',
    )
    articleHeaderDropdownMenuTrigger = page
      .getByTestId('article-header/dropdown-menu/trigger')
      .first()
    articleHeaderDropdownMenuEditButton = page.getByTestId(
      'article-header/dropdown-menu/content/edit-button',
    )
    articleHeaderDropdownMenuRemoveButton = page.getByTestId(
      'article-header/dropdown-menu/content/remove-button',
    )

    articlePageEditorContent = page.getByTestId('editor-content')

    contentParagraph = page.getByTestId('content-paragraph')
    contentRichParagraph = page.getByTestId('content-rich-paragraph')
    contentBold = page.getByTestId('content-bold')
    contentItalic = page.getByTestId('content-italic')
    contentStrike = page.getByTestId('content-strike')
    contentHeading2 = page.getByTestId('content-heading-2')
    contentHeading3 = page.getByTestId('content-heading-3')
    contentBlockquote = page.getByTestId('content-blockquote')
    contentBulletList = page.getByTestId('content-bullet-list')
    contentOrderedList = page.getByTestId('content-ordered-list')
    articleContentHorizontalRule = page
      .getByTestId('editor-content')
      .locator('div[data-type="horizontalRule"]')

    articlePageSuccessToast = page.getByTestId('success-toast')
    articlePageDangerToast = page.getByTestId('danger-toast')

    feedPageArticleCard = page.getByTestId('feed-page/article-card')
  })

  test(
    'should be render an article content with every editor node type',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto }) => {
      await createRichArticle(prisma)

      await goto('/article/1', { waitUntil: 'hydration' })

      await expect(articlePageEditorContent).toBeVisible()
      await expect(contentParagraph).toHaveText('Абзац с обычным текстом')

      await expect(contentRichParagraph).toBeVisible()
      await expect(contentBold).toHaveText('Жирный')
      await expect(contentItalic).toHaveText('курсивный')
      await expect(contentStrike).toHaveText('зачёркнутый')
      await expect(articlePageEditorContent.locator('code')).toHaveText('код')
      await expect(articlePageEditorContent.locator('u')).toHaveText(
        'подчёркнутый',
      )
      await expect(articlePageEditorContent.locator('br')).toHaveCount(1)

      await expect(contentHeading2).toHaveText('Заголовок H2')
      await expect(contentHeading3).toHaveText('Заголовок H3')

      await expect(contentBlockquote).toHaveText('Цитата')

      await expect(contentBulletList.locator('li')).toHaveText(
        'Маркированный список',
      )
      await expect(contentOrderedList.locator('li')).toHaveText(
        'Нумерованный список',
      )

      await expect(articleContentHorizontalRule.locator('hr')).toHaveCount(1)
    },
  )

  test(
    'should be show an article created-at date',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto }) => {
      await createArticle(prisma, ['Test article'], new Date(0))

      await goto('/article/1', { waitUntil: 'hydration' })

      await expect(articleHeaderCreatedAt).toHaveText(
        getFormattedDate(new Date(0)),
      )
    },
  )

  test(
    'should be open the dropdown menu with the edit and remove buttons',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto }) => {
      await createArticle(prisma, ['Test article'])

      await goto('/article/1', { waitUntil: 'hydration' })

      await expect(articleHeaderDropdownMenuContent).toBeHidden()

      await articleHeaderDropdownMenuTrigger.click()

      await expect(articleHeaderDropdownMenuContent).toBeVisible()
      await expect(articleHeaderDropdownMenuEditButton).toContainText(
        'Редактировать',
      )
      await expect(articleHeaderDropdownMenuRemoveButton).toContainText(
        'Удалить',
      )
    },
  )

  test(
    'should be navigate to the editor-page when the edit button is clicked',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto, page }) => {
      await createArticle(prisma, ['Test article'])

      await goto('/article/1', { waitUntil: 'hydration' })

      await articleHeaderDropdownMenuTrigger.click()
      await articleHeaderDropdownMenuEditButton.click()

      await expect(page).toHaveURL('/editor?id=1')
    },
  )

  test(
    'should be delete an article, show a success toast and redirect to the feed',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto, page }) => {
      await createArticle(prisma, ['Test article'])

      await goto('/article/1', { waitUntil: 'hydration' })

      await articleHeaderDropdownMenuTrigger.click()
      await articleHeaderDropdownMenuRemoveButton.click()

      await expect(articlePageSuccessToast).toBeVisible()
      await expect(articlePageSuccessToast).toContainText('Запись удалена')

      await expect(page).toHaveURL('/feed/fresh')
      await expect(feedPageArticleCard).toHaveCount(0)
    },
  )

  test(
    'should be redirect to the feed and show an error toast when deleting fails',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto, page }) => {
      await createArticle(prisma, ['Test article'])

      await page.route('**/articles/*', async (route) => {
        if (route.request().method() === 'DELETE') {
          return route.abort()
        }

        return route.continue()
      })

      await goto('/article/1', { waitUntil: 'hydration' })

      await articleHeaderDropdownMenuTrigger.click()
      await articleHeaderDropdownMenuRemoveButton.click()

      await expect(page).toHaveURL('/feed/fresh')
      await expect(articlePageDangerToast).toBeVisible()
      await expect(articlePageDangerToast).toContainText(
        'Не удалось удалить запись',
      )
      await expect(feedPageArticleCard).toHaveCount(1)
    },
  )
})
