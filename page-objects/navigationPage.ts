import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class Navigationpage  extends HelperBase {
    
    readonly tooltipmenuitem: Locator;

    constructor(page: Page){
        super(page)
        this.tooltipmenuitem = page.getByText('Tooltip')
    }
     async navigateToFormsPage(){ //method to navigate to forms page
    await this.groupMenuitem('Forms')
    await this.page.getByText('Form Layouts').click()
    await this.page.waitForTimeout(2)
    //await this.fromlayoutsmenuitem.click()
     }

     async navigateToDatepickerPage(){
        //await this.page.getByText('Forms').click()
        await this.groupMenuitem('Forms')
        //await this.page.waitForTimeout(1000)
         await this.page.getByText('Datepicker').click() 
     }

     async naviagateTOModalsandOverlays(){
        //await this.page.getByText('Modal & Overlays').click()
        await this.groupMenuitem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
     }

     async navigateToSmartTablePage(){
         await this.page.getByText('Tables & Data').click()
         await this.page.getByText('Smart Table').click()

     }

     async navigateToTooltipPage(){
           //await this.page.getByText('Modal & Overlays').click()
           await this.groupMenuitem('Modal & Overlays')
         await this.tooltipmenuitem.click()
     }

     private async groupMenuitem(menuitem: string){
        const menuitemLocator = this.page.getByTitle(menuitem)
        const expandedstate = await menuitemLocator.getAttribute('aria-expanded')
        if(expandedstate=='false'){
            await menuitemLocator.click()
        }
     }

}