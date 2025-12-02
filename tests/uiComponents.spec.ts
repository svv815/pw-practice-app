import { test, expect } from '@playwright/test'
import { circle } from 'leaflet'
import { delay } from 'rxjs-compat/operator/delay'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test.describe('Form Layouts page', () =>{
    test.describe.configure({retries: 0}) // to retry failed tests twice

    test.beforeEach(async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    })

    test('input fields', async({page}) => {
        const emailfiledusinggrid = await page.locator('nb-card' , {hasText: 'Using the Grid'}).getByRole('textbox',{name:"Email"})
        await emailfiledusinggrid.fill('test@123.com')
        await emailfiledusinggrid.clear()
        await emailfiledusinggrid.pressSequentially('test2@123.com', {delay:500})

        //genneric assertion 
        const inputvalue = await emailfiledusinggrid.inputValue()
        expect(inputvalue).toEqual('test2@123.com')

        //Locator assertion
        await expect(emailfiledusinggrid).toHaveValue('test2@123.com')
    })
    
    test.only('radio buttons' , async({page}) =>{
        const radiobuttonopn = page.locator('nb-card' , {hasText: 'Using the Grid'})
       //await radiobuttonopn.getByLabel('Option 1').check({force:true}) // --.getbylabl
       await radiobuttonopn.getByRole('radio',{name:'Option 1'}).check({force:true}) //--getbyrole

       
       const radiobtn = await radiobuttonopn.getByRole('radio',{name:'Option 1'}).isChecked()
       await expect(radiobuttonopn).toHaveScreenshot() // visual comparison

    //    expect(radiobtn).toBeTruthy() //tobetrustworthy
    //    await expect(radiobuttonopn.getByRole('radio',{name:'Option 1'})).toBeChecked()

    //    await radiobuttonopn.getByRole('radio',{name:'Option 2'}).check({force:true})
    //    expect(await radiobuttonopn.getByRole('radio',{name:'Option 1'}).isChecked()).toBeFalsy()
    //    expect(await radiobuttonopn.getByRole('radio',{name:'Option 2'}).isChecked()).toBeTruthy()      
    })

    test('checkboxes', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    //await page.getByRole('checkbox',{name:"Hide on click"}).click({force:true})
    await page.getByRole('checkbox',{name:"Hide on click"}).uncheck({force:true})
    await page.getByRole('checkbox',{name:"Prevent arising of duplicate toast"}).check({force:true})
    //await page.getByRole('checkbox',{name:"Show toast with icon"}).uncheck({force:true})

    //to check all checkboxes on a page
    const checkallboxes = page.getByRole('checkbox')
    //.all is the method used to convert all items into list of array
    for(const box of await checkallboxes.all()){
        await box.check({force:true})
        expect(await checkallboxes.isChecked()).toBeTruthy()
    }

    //to uncheck all checkboxes 
    for(const box of await checkallboxes.all()){
        await box.uncheck({force:true})
        expect(await checkallboxes.isChecked()).toBeFalsy()
     }
})

    test('Lists and dropdowns',async({page})=> {
        const dropDown = await page.locator('ngx-header nb-select')
        await dropDown.click()
        
        page.getByRole('list') // when list has UI tag
        page.getByRole('listitem') //when page has LI tag

        const optionList = await page.locator('nb-option-list nb-option')
        await expect(optionList).toHaveText(["Light","Dark" ,"Cosmic","Corporate"])

        //pick one value from the lista nd validate the background color change 
        await optionList.filter({hasText: "Cosmic"}).click()
        const header = page.locator('nb-layout-header')
        await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

        //write for loop to iterate thru each option from list and validate 

        const colors = {
            "Light": "rgb(255, 255, 255)",
            "Dark": "rgb(34, 43, 69)",
            "Cosmic": "rgb(50, 50, 89)",
            "Corporate": "rgb(255, 255, 255)"

        }

        await dropDown.click()
        for(const color in colors)
        {
            await optionList.filter({hasText: color}).click()
            await expect(header).toHaveCSS('background-color', colors[color])
            if(color!=="Corporate")

            await dropDown.click()
        }
})

    test('tool tip', async({page}) => {
         await page.getByText('Modal & Overlays').click()
         await page.getByText('Tooltip').click()

         const toolTips = page.locator('nb-card',{hasText:'Tooltip Placements'})
         await toolTips.getByText('Top').hover()

         //page.getbyrole('tooltip') -- when there's a role tool tip created
         const tooltiptext = page.locator('nb-tooltip')
         await expect(tooltiptext).toHaveText('This is a tooltip')
})

    test('dialog box creation', async({page}) => {
         await page.getByText('Tables & Data').click()
         await page.getByText('Smart Table').click()

         //to hold the dialopg window validate and accept 

         page.on('dialog',dialog => {
            expect(dialog.message()).toEqual('Are you sure you want to delete?')
            dialog.accept
         })

         await page.getByRole('table').locator('tr',{hasText:'mdo@gmail.com'}).locator('.nb-trash').click({timeout:5000})
         await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')

})
    test('date picker', async({page}) => {
        await page.getByText('Forms').click()
         await page.getByText('Datepicker').click()

         const calinputfield = page.getByPlaceholder('Form Picker')
         await calinputfield.click()

         //await page.locator('[class="day-cell ng-star-inserted"]').getByText('13').click()

         //if wants to selct the exact match date from the list if dates 
            await page.locator('[class="day-cell ng-star-inserted"]').getByText('1',{exact:true}).click()
            await expect(calinputfield).toHaveValue('Oct 1, 2025')
    })

      test('date picker withjs', async({page}) => {
        await page.getByText('Forms').click()
         await page.getByText('Datepicker').click()

         const calinputfield = page.getByPlaceholder('Form Picker')
         await calinputfield.click()

         
         let date = new Date()
         date.setDate(date.getDate() +25) // .getdate gets the current date and as +1 adds one more day to it wich is nov 1 
         //date.setDate(date.getDate())
         const expectedday = date.getDate().toString()
         const expectedMonthshot = date.toLocaleString('default', {month:'short'})
         const expectedMonthLong = date.toLocaleString('default', {month:'long'})
         const expectedyear = date.getFullYear()
         const expectedassertion = `${expectedMonthshot} ${expectedday}, ${expectedyear}`

         let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
         const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedyear}`

         while(!calendarMonthAndYear?.includes(expectedMonthAndYear))
         {
            await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
         }

         //if wants to selct the exact match date from the list if dates 
            await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedday,{exact:true}).click()
            await expect(calinputfield).toHaveValue(expectedassertion)
    })

    test('sliders', async({page}) => {
        // const tempGuage = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
        // await tempGuage.evaluate(node => {
        //     node.setAttribute('cx','232.63')
        //     node.setAttribute('cy','232.63')
        // })
        // await tempGuage.click()

        //mouse movement 
        const tempval = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
        await tempval.scrollIntoViewIfNeeded()

        const box = await tempval.boundingBox()
        const x = box.x + box.width /2
        const y = box.y + box.height /2
        await page.mouse.move(x,y)
        await page.mouse.down()
        await page.mouse.move(x+100,y)
        await page.mouse.move(x+100,y+100)
        await page.mouse.up()
        await expect(tempval).toHaveText('30 Celsius')
    })
})