import{test} from '../page-objects/test-options'
import { PageManager } from '../page-objects/pageManager'
// Remove static import of faker

// test.beforeEach(async({page}) => {
//     await page.goto('/')
// })


test('parametrized methods', async({page, formsPageURL}) => {
    const pm = new PageManager(page)
    const { faker } = await import('@faker-js/faker')
    const randomEmail = faker.internet.email()

    // await pm.navigateTo().navigateToFormsPage()
    await pm.onFormLayoutsPage().submitFormwithEmailandPassword(randomEmail,'Test@123','Option 2')
    await pm.onFormLayoutsPage().submitInlineFormwithEmailPasswordandCheckbox('test@124.com','Test@124',true)
})
