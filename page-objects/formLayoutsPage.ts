import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutspage extends HelperBase{

    constructor(page:Page){
        super(page)
    }
     async submitFormwithEmailandPassword(email: string, password: string, optionText: string){
        const submitFormwithEmailandPassword = await this.page.locator('nb-card', {hasText:"Using the Grid"})
        await submitFormwithEmailandPassword.getByRole('textbox',{name:"Email"}).fill(email)
        await submitFormwithEmailandPassword.getByLabel('Password').fill(password)
        await submitFormwithEmailandPassword.getByRole('radio',{name:optionText}).check({force:true})
        await submitFormwithEmailandPassword.getByRole('button',{name:"Sign in"}).click()
     }

     /**
      * method to submit inline form with email , password and checkbox
      *
      * @param email - string
      * @param password - string
      * @param Checkmeout - boolean
      */
     async submitInlineFormwithEmailPasswordandCheckbox(email: string, password: string, Checkmeout: boolean){
        const submitInlineFormwithEmailPasswordandCheckbox = await this.page.locator('nb-card', {hasText:"Basic form"})
        await submitInlineFormwithEmailPasswordandCheckbox.getByRole('textbox',{name:"Email"}).fill(email)
        await submitInlineFormwithEmailPasswordandCheckbox.getByLabel('Password').fill(password)
         if(Checkmeout){
        await submitInlineFormwithEmailPasswordandCheckbox.getByRole('checkbox').check({force:true})
        await submitInlineFormwithEmailPasswordandCheckbox.getByRole('button').click()
    } 

        // await submitInlineFormwithEmailPasswordandCheckbox.getByRole('checkbox',{name:"Check me out"}).check({force:true})
        // await submitInlineFormwithEmailPasswordandCheckbox.getByRole('button',{name:"submit"}).click()
     }

}