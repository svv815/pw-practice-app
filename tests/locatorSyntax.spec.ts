import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('locatorsyntax rukes',async({page})=>
{
   //by tag name
   await page.locator('input').first().click()

   //by id
   page.locator('#inputEmail1')

   //by class value 
   page.locator('.input-full-width')

   //by attribute
   page.locator('[placeholder="Email"]')

   //by entire class value
   page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition cdk-focused cdk-mouse-focused"]')

   //combine diff selectors
   page.locator('input[[placeholder="Email"]')

   //by xpath
   page.locator('//*[@id="inputEmail"]')

   //by partial text match
   page.locator(':text("Using")')

   //by exact text match 
   page.locator(':text-is("Using the Grid")')
})

test('user facing locators', async({page})=>
    {   
        // by role
        await page.getByRole('textbox',{name:"Email"}).first().click()
        await page.getByRole('button',{name:"Submit"}).first().click()

        //by label
        await page.getByLabel("Email").first().click()
        //by placeholder
        await page.getByPlaceholder("Jane Doe").click()

        //bytext
        await page.getByText("Email").first().click()

        //by title
        await page.getByTitle("IoT Dashboard").click()

        // //by testid
        // await page.getByTestId("Signone").click()
})

test("locating child elements", async({page})=>
{
    //by child elements
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

    //changing elemnets one by one meanings econd option from radio buttons
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    //find one from multiple ones with the same name ex:signin
    //await page.locator('nb-card :text-is("Sign in")').first().click()
    await page.locator('nb-card').getByRole('button',{name:"Sign in"}).first().click()

    //by id 
    await page.locator('nb-card').nth(4).getByRole('button').click()
})

test("locating parent elements", async({page}) => 
{
    await page.locator('nb-card', {hasText:"Using the Grid"}).getByRole('textbox',{name:"Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputPassword2')}).getByRole('textbox', {name: "Password"}).click()

    //by filter
    await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox',{name:"Email"}).click()

    await page.locator('nb-card').filter({has: page.locator('#exampleInputPassword1')}).getByRole('textbox', {name: "Password"}).click()

    //apply filter and check

    await page.locator('nb-card').filter({hasText:"Remember me"}).getByRole('button',{name:'Sign in'}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText:"Sign in"}).getByRole('textbox',{name:"Email"}).click()

    //one level above the child 
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox',{name:"Email"}).click()
})

test("reusing locators", async({page}) => 
{
    const basicform = page.locator('nb-card').filter({hasText:"Basic form"})
    const emailbox = basicform.getByRole('textbox',{name:"Email"})

    await emailbox.fill('test@123.com')
    await basicform.getByRole('textbox', {name: "Password"}).fill('Abc@1234')
    await basicform.locator('nb-checkbox').click()
    await basicform.getByRole('button').click()

    //assertion 
    await expect(emailbox).toHaveValue('test@123.com')
})
test(" extracting values", async({page}) =>
{
    //single test value - textcontent()
    const basicform = page.locator('nb-card').filter({hasText:"Basic form"})
    const buttontext =await basicform.getByRole('button').textContent()
    //assertion
    expect(buttontext).toEqual('Submit')

    //all text values -- allTextContents()
    const allradiobuttons = await page.locator('nb-radio').allTextContents()
    //assertion
    expect(allradiobuttons).toContain('Option 1')

    //input value - inputvalue()

    const emailfield = basicform.getByRole('textbox',{name:"Email"})
    await emailfield.fill('test@123.com')
    const emailvalue = await emailfield.inputValue()
    //assertion
    expect(emailvalue).toEqual('test@123.com')

    //value of attribute 
    const attributevalue = await emailfield.getAttribute('placeholder')
    //assertion
    expect(attributevalue).toEqual('Email')

})
test("assertions", async({page}) => {

    //Genral assertion 
    const value = 5
    expect(value).toEqual(5)

    const basicformbutton = page.locator('nb-card').filter({hasText:"Basic form"}).locator('button')

    const text = await basicformbutton.textContent()
    expect(text).toEqual("Submit")

    //Locator assertion
    await expect(basicformbutton).toHaveText('Submit')

    //soft assertion
    await expect.soft(basicformbutton).toHaveText('Submit')
    await basicformbutton.click()
})