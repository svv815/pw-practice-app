import { expect, test } from '@playwright/test'
import { TIMEOUT } from 'dns'

test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test('autowaiting', async({page}) => 
{
    const successmsg = page.locator('.bg-success')
    await successmsg.click()

    const text = await successmsg.textContent()
    expect(text).toEqual('Data loaded with AJAX get request.')

    // for all text contents

    await successmsg.waitFor({state: 'attached'})
    const text1 = await successmsg.allTextContents()
    expect(text1).toContain('Data loaded with AJAX get request.')

    //timeout 
    await expect(successmsg).toHaveText('Data loaded with AJAX get request.', {timeout: 20000}) 
})

test('altternative waits' , async({page}) =>
{
     const successmsg = page.locator('.bg-success')

    // //wait for element 
    // await page.waitForSelector('.bg-success')
    // //  const text1 = await successmsg.allTextContents()
    // // expect(text1).toContain('Data loaded with AJAX get request.')

    //wait for particular response 
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //  const text1 = await successmsg.allTextContents()
    // expect(text1).toContain('Data loaded with AJAX get request.')

    //wait for network calls to be completed 

    await page.waitForLoadState('networkidle')
     const text1 = await successmsg.allTextContents()
    expect(text1).toContain('Data loaded with AJAX get request.')

})

test('timeout', async({page}) =>
{
    //test.setTimeout(10000)
    test.slow()
    const successmsg = page.locator('.bg-success')
    //await successmsg.click({timeout: 16000})
    await successmsg.click()

})