import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test.describe('test2', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Charts').first().click()
    })

    test('the first test', async ({ page }) => {
        await page.getByText('Echarts').first().click()
    })
})

test.describe('test1', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
    })

    test('the first test1', async ({ page }) => {
        await page.getByText('Form Layouts').click()
    })

    test('the datepicker page2', async ({ page }) => {
        await page.getByText('Datepicker').click()
    })
})


