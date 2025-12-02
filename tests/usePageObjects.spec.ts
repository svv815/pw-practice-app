import{test , expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
// Remove static import of faker

test.beforeEach(async({page}) => {
    await page.goto('/')
})

test('navigate to form page @smoke', async({page}) => {
    const pm = new PageManager(page)
    //const navigateTo = new Navigationpage(page) // new instance of navigationPage class 
    await pm.navigateTo().navigateToFormsPage   //navigateToFormsPage IS THE METHOD FROM navigationPage.ts
    await pm.navigateTo().navigateToDatepickerPage() 
    await pm.navigateTo().naviagateTOModalsandOverlays()
    await pm.navigateTo().navigateToSmartTablePage()
    await pm.navigateTo().navigateToTooltipPage()
})

test('parametrized methods @smoke', async({page}) => {
    const pm = new PageManager(page)
    const { faker } = await import('@faker-js/faker')
    const randomEmail = faker.internet.email()

    await pm.navigateTo().navigateToFormsPage()
    await pm.onFormLayoutsPage().submitFormwithEmailandPassword(randomEmail,'Test@123','Option 2')
    await pm.onFormLayoutsPage().submitInlineFormwithEmailPasswordandCheckbox('test@124.com','Test@124',true)
     await page.screenshot({path:'screenshots/navigateToFormsPage.png'})     //--screenshot after form submission
     await page.locator('nb-card',{hasText:'Using the Grid'}).screenshot({path:'screenshots/formlayoutcard.png'}) //--screenshot of specific card
     const buffer  = await page.screenshot()  //--screenshot as buffer
     console.log(buffer.toString('base64'))  //--screenshot as base64 string
    // await pm.navigateTo().navigateToDatepickerPage()
    // await pm.onDatepickerPage().selectDatepickerforCommonandRange(5)
    // await pm.onDatepickerPage().selectDatepickerforRangefromtoday(3,5)
})

test.only('testing with argos ci', async({page}) => {
    const pm = new PageManager(page)
    //const navigateTo = new Navigationpage(page) // new instance of navigationPage class 
    await pm.navigateTo().navigateToFormsPage   //navigateToFormsPage IS THE METHOD FROM navigationPage.ts
    await pm.navigateTo().navigateToDatepickerPage()
})
