import { expect, test } from '@nuxt/test-utils/playwright'
import type { Locator } from 'playwright-core'
import { PrismaClient } from '../../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { authentication } from '../utils'
import { createManyArticles, truncateArticles } from './utils'

test.describe('Article page', () => {
  let articleHeaderDropdownMenuTrigger: Locator
  let articleHeaderDropdownMenu: Locator
  let articleHeaderDropdownMenuRemoveButton: Locator

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

    articleHeaderDropdownMenu = page.getByTestId(
      'article-header/dropdown-menu/content',
    )
    articleHeaderDropdownMenuTrigger = page
      .getByTestId('article-header/dropdown-menu/trigger')
      .first()
    articleHeaderDropdownMenuRemoveButton = page.getByTestId(
      'article-header/dropdown-menu/content/remove-button',
    )
    feedPageArticleCard = page.getByTestId('feed-page/article-card')
  })
})
