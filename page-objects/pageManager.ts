import { Page ,expect} from "@playwright/test";
import { Navigationpage } from '../page-objects/navigationPage'
import { FormLayoutspage } from '../page-objects/formLayoutsPage'
import { DatePicker } from '../page-objects/datepickerPage'


export class PageManager{
    private readonly page: Page
    readonly navigationpage: Navigationpage
    readonly formLayoutspage: FormLayoutspage
    readonly datepickerpage: DatePicker

    constructor(page:Page){

        this.page = page
        this.navigationpage = new Navigationpage(this.page)
        this.formLayoutspage = new FormLayoutspage(this.page)
        this.datepickerpage = new DatePicker(this.page)
    }

    navigateTo(){
        return this.navigationpage
    }

    onFormLayoutsPage(){
        return this.formLayoutspage
    }
    onDatepickerPage(){
        return this.datepickerpage
    }

}