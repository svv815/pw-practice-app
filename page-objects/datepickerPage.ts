import { Page ,expect} from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatePicker extends HelperBase{

    constructor(page:Page){
        super(page)
    }

    async selectDatepickerforCommonandRange(numberofdaysfromtoday: number){
        const calinputfield = this.page.getByPlaceholder('Form Picker')
        await calinputfield.click()
        const expectedassertion = await this.selectDateintheCalendar(numberofdaysfromtoday)
        await expect(calinputfield).toHaveValue(expectedassertion)

    }

    async selectDatepickerforRangefromtoday(startnumberofdaysfromtoday: number, endnumberofdaysfromtoday: number){
       const calinputfield = this.page.getByPlaceholder('Range Picker')
        await calinputfield.click()
        const expectedassertionstart = await this.selectDateintheCalendar(startnumberofdaysfromtoday)
        const expectedassertionend = await this.selectDateintheCalendar(endnumberofdaysfromtoday)
        const expectedassertion = `${expectedassertionstart} - ${expectedassertionend}`
        await expect(calinputfield).toHaveValue(expectedassertion) 
    }

    private async selectDateintheCalendar(numberofdaysfromtoday: number){{
        let date = new Date()
                 date.setDate(date.getDate() +numberofdaysfromtoday) // .getdate gets the current date and as +1 adds one more day to it wich is nov 1 
                 //date.setDate(date.getDate())
                 const expectedday = date.getDate().toString()
                 const expectedMonthshot = date.toLocaleString('default', {month:'short'})
                 const expectedMonthLong = date.toLocaleString('default', {month:'long'})
                 const expectedyear = date.getFullYear()
                 const expectedassertion = `${expectedMonthshot} ${expectedday}, ${expectedyear}`
        
                 let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
                 const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedyear}`
        
                 while(!calendarMonthAndYear?.includes(expectedMonthAndYear))
                 {
                    await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
                    calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
                 }
        
                 //if wants to selct the exact match date from the list if dates 
                    await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedday,{exact:true}).click()
                    return expectedassertion
    }
                  
}
}