import { expect, test } from '@nuxt/test-utils/playwright'
import type { Locator } from 'playwright-core'
import { PrismaClient } from '../../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { createManyArticles } from './utils/create-many-articles'
import { authentication } from '../utils'
import { getFormattedDate } from './utils/get-formatted-date'

test.describe('Feed page', () => {
  let feedPageSelectTrigger: Locator
  let feedPageSelectFreshFeedButton: Locator
  let feedPageSelectOldFeedButton: Locator
  let feedPageArticleCard: Locator
  let fistArticleCardArticleHeaderDropdownMenuTrigger: Locator
  let fistArticleCardArticleHeaderDropdownMenuContent: Locator
  let fistArticleCardArticleHeaderDropdownMenuEditButton: Locator
  let fistArticleCardArticleHeaderDropdownMenuRemoveButton: Locator
  let feedPageLoader: Locator
  let feedPageNoMoreLabel: Locator
  let feedPageDontHaveLabel: Locator
  let feedPageEditorPageLink: Locator
  let feedPageSuccessToast: Locator
  let feedPageDangerToast: Locator

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

    feedPageSelectTrigger = page.getByTestId('feed-page/select/trigger')
    feedPageSelectFreshFeedButton = page.getByTestId(
      'feed-page/select/fresh-feed-button',
    )
    feedPageSelectOldFeedButton = page.getByTestId(
      'feed-page/select/old-feed-button',
    )
    feedPageArticleCard = page.getByTestId('feed-page/article-card')
    fistArticleCardArticleHeaderDropdownMenuTrigger = feedPageArticleCard
      .first()
      .getByTestId('article-header/dropdown-menu/trigger')
    fistArticleCardArticleHeaderDropdownMenuContent = page.getByTestId(
      'article-header/dropdown-menu/content',
    )
    fistArticleCardArticleHeaderDropdownMenuEditButton = page.getByTestId(
      'article-header/dropdown-menu/content/edit-button',
    )
    fistArticleCardArticleHeaderDropdownMenuRemoveButton = page.getByTestId(
      'article-header/dropdown-menu/content/remove-button',
    )
    feedPageLoader = page.getByTestId('feed-page/loader')
    feedPageNoMoreLabel = page.getByTestId('feed-page/no-more-label')
    feedPageDontHaveLabel = page.getByTestId('feed-page/dont-have-label')
    feedPageEditorPageLink = page.getByTestId('feed-page/editor-page-link')
    feedPageSuccessToast = page.getByTestId('success-toast')
    feedPageDangerToast = page.getByTestId('danger-toast')
  })

  test(
    'should be switch the sorting to fresh',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto, page }) => {
      await createManyArticles(prisma, 10)

      await goto('/feed/old', { waitUntil: 'hydration' })

      await expect(page).toHaveURL('/feed/old')
      await expect(feedPageSelectTrigger).toHaveText('Старые')

      await feedPageSelectTrigger.click()
      await feedPageSelectFreshFeedButton.click()

      await expect(page).toHaveURL('/feed/fresh')
      await expect(feedPageSelectTrigger).toHaveText('Новые')
    },
  )

  test(
    'should be switch the sorting to old',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto, page }) => {
      await createManyArticles(prisma, 10)

      await goto('/feed/fresh', { waitUntil: 'hydration' })

      await expect(page).toHaveURL('/feed/fresh')
      await expect(feedPageSelectTrigger).toHaveText('Новые')

      await feedPageSelectTrigger.click()
      await feedPageSelectOldFeedButton.click()

      await expect(page).toHaveURL('/feed/old')
      await expect(feedPageSelectTrigger).toHaveText('Старые')
    },
  )

  test(
    'should be show an 1 page of articles ordering by ASC',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto }) => {
      await createManyArticles(prisma, 10)

      await goto('/feed/old', { waitUntil: 'hydration' })

      await expect(
        feedPageArticleCard
          .first()
          .locator('[data-testid="article-header/created-at"]'),
      ).toHaveText(getFormattedDate(new Date(0)))

      await expect(
        feedPageArticleCard
          .last()
          .locator('[data-testid="article-header/created-at"]'),
      ).toHaveText(getFormattedDate(new Date(9 * 60 * 1000)))
    },
  )

  test(
    'should be show an 1 page of articles ordering by DESC',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto }) => {
      await createManyArticles(prisma, 10)

      await goto('/feed/fresh', { waitUntil: 'hydration' })

      await expect(
        feedPageArticleCard
          .first()
          .locator('[data-testid="article-header/created-at"]'),
      ).toHaveText(getFormattedDate(new Date(9 * 60 * 1000)))

      await expect(
        feedPageArticleCard
          .last()
          .locator('[data-testid="article-header/created-at"]'),
      ).toHaveText(getFormattedDate(new Date(0)))
    },
  )

  test(
    'should be show a 2 pages of articles ordering by ASC',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto }) => {
      await createManyArticles(prisma, 20)

      await goto('/feed/old', { waitUntil: 'hydration' })

      await expect(feedPageArticleCard).toHaveCount(10)

      await expect(
        feedPageArticleCard
          .first()
          .locator('[data-testid="article-header/created-at"]'),
      ).toHaveText(getFormattedDate(new Date(0)))

      await expect(
        feedPageArticleCard
          .nth(9)
          .locator('[data-testid="article-header/created-at"]'),
      ).toHaveText(getFormattedDate(new Date(9 * 60 * 1000)))

      await expect(feedPageNoMoreLabel).not.toBeVisible()
      await expect(feedPageLoader).toBeVisible()

      await feedPageLoader.scrollIntoViewIfNeeded()

      await expect(feedPageArticleCard).toHaveCount(20)

      await expect(
        feedPageArticleCard
          .nth(10)
          .locator('[data-testid="article-header/created-at"]'),
      ).toHaveText(getFormattedDate(new Date(10 * 60 * 1000)))

      await expect(
        feedPageArticleCard
          .last()
          .locator('[data-testid="article-header/created-at"]'),
      ).toHaveText(getFormattedDate(new Date(19 * 60 * 1000)))

      await expect(feedPageNoMoreLabel).toBeVisible()
      await expect(feedPageLoader).not.toBeVisible()
    },
  )

  test(
    'should be show a 2 pages of articles ordering by DESC',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto }) => {
      await createManyArticles(prisma, 20)

      await goto('/feed/fresh', { waitUntil: 'hydration' })

      await expect(feedPageArticleCard).toHaveCount(10)

      await expect(
        feedPageArticleCard
          .first()
          .locator('[data-testid="article-header/created-at"]'),
      ).toHaveText(getFormattedDate(new Date(19 * 60 * 1000)))

      await expect(
        feedPageArticleCard
          .nth(9)
          .locator('[data-testid="article-header/created-at"]'),
      ).toHaveText(getFormattedDate(new Date(10 * 60 * 1000)))

      await expect(feedPageNoMoreLabel).not.toBeVisible()
      await expect(feedPageLoader).toBeVisible()

      await feedPageLoader.scrollIntoViewIfNeeded()

      await expect(feedPageArticleCard).toHaveCount(20)

      await expect(
        feedPageArticleCard
          .nth(10)
          .locator('[data-testid="article-header/created-at"]'),
      ).toHaveText(getFormattedDate(new Date(9 * 60 * 1000)))

      await expect(
        feedPageArticleCard
          .last()
          .locator('[data-testid="article-header/created-at"]'),
      ).toHaveText(getFormattedDate(new Date(0)))

      await expect(feedPageNoMoreLabel).toBeVisible()
      await expect(feedPageLoader).not.toBeVisible()
    },
  )

  test(
    'should be navigate to the article-page when the article-card is clicked',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto, page }) => {
      await prisma.article.create({
        data: {
          authorId: 1,
          content: {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Test',
                  },
                ],
              },
            ],
          },
        },
      })

      await goto('/feed', { waitUntil: 'hydration' })

      await feedPageArticleCard.first().click()

      await expect(page).toHaveURL('/article/1')
    },
  )

  test(
    'should be open a card dropdown menu with an edit and a remove buttons',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto }) => {
      await createManyArticles(prisma, 3)

      await goto('/feed', { waitUntil: 'hydration' })

      await fistArticleCardArticleHeaderDropdownMenuTrigger.click()

      await expect(
        fistArticleCardArticleHeaderDropdownMenuContent,
      ).toBeVisible()

      await expect(
        fistArticleCardArticleHeaderDropdownMenuEditButton,
      ).toBeVisible()

      await expect(
        fistArticleCardArticleHeaderDropdownMenuEditButton,
      ).toContainText('Редактировать')

      await expect(
        fistArticleCardArticleHeaderDropdownMenuRemoveButton,
      ).toBeVisible()

      await expect(
        fistArticleCardArticleHeaderDropdownMenuRemoveButton,
      ).toContainText('Удалить')
    },
  )

  test(
    'should be navigate to the editor-page when the edit button is clicked',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto, page }) => {
      await createManyArticles(prisma, 1)

      await goto('/feed', { waitUntil: 'hydration' })

      await fistArticleCardArticleHeaderDropdownMenuTrigger.click()
      await fistArticleCardArticleHeaderDropdownMenuEditButton.click()

      await expect(page).toHaveURL('/editor?id=1')
    },
  )

  test(
    'should be delete an article, show a success toast and remove it from the feed',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto }) => {
      await createManyArticles(prisma, 1)

      await goto('/feed', { waitUntil: 'hydration' })

      await expect(feedPageArticleCard).toHaveCount(1)

      await fistArticleCardArticleHeaderDropdownMenuTrigger.click()
      await fistArticleCardArticleHeaderDropdownMenuRemoveButton.click()

      await expect(feedPageArticleCard).toHaveCount(0)
      await expect(feedPageSuccessToast).toBeVisible()
      await expect(feedPageSuccessToast).toContainText('Запись удалена')
    },
  )

  test(
    'should be rollback the article and show an error toast when deleting fails',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto, page }) => {
      await createManyArticles(prisma, 1)

      await page.route('**/articles/*', async (route) => {
        if (route.request().method() === 'DELETE') {
          return route.abort()
        }

        return route.continue()
      })

      await goto('/feed', { waitUntil: 'hydration' })

      await expect(feedPageArticleCard).toHaveCount(1)

      await fistArticleCardArticleHeaderDropdownMenuTrigger.click()
      await fistArticleCardArticleHeaderDropdownMenuRemoveButton.click()

      await expect(feedPageDangerToast).toBeVisible()
      await expect(feedPageDangerToast).toContainText(
        'Не удалось удалить запись',
      )
      await expect(feedPageArticleCard).toHaveCount(1)
    },
  )

  test(
    'should be show an empty state with a create button when there are no articles',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto }) => {
      await goto('/feed', { waitUntil: 'hydration' })

      await expect(feedPageDontHaveLabel).toBeVisible()
      await expect(feedPageDontHaveLabel).toHaveText('У вас нет записей')
      await expect(feedPageArticleCard).toHaveCount(0)
      await expect(feedPageNoMoreLabel).not.toBeVisible()
      await expect(feedPageLoader).not.toBeVisible()
      await expect(feedPageEditorPageLink).toBeVisible()
    },
  )

  test(
    'should be navigate to the editor-page when the create button is clicked',
    { tag: ['@mobile', '@desktop'] },
    async ({ goto, page }) => {
      await goto('/feed', { waitUntil: 'hydration' })

      await feedPageEditorPageLink.click()

      await expect(page).toHaveURL('/editor')
    },
  )
})
