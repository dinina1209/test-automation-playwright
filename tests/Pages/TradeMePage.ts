import { Page, Locator, expect } from "@playwright/test";
import exp from "constants";

//const baseURL:string = "https://www.trademe.co.nz/";
export class TradeMepage{
    readonly page:Page;
    readonly searchButton:Locator;
    readonly motrsLink:Locator;
    readonly makeDropdown:Locator;
    readonly makeSelector:Locator;
    readonly viewListingButton: Locator;
    readonly result: Locator;
    readonly heading: Locator;
    readonly resultCount: Locator;
    readonly viewResultButton:Locator;
    readonly searchBox:Locator;
    readonly searchBar:Locator;
    readonly clearInput:Locator;
    readonly searchCount:Locator;
    constructor(page:Page){
        this.page = page;
        this.motrsLink = page.getByRole('link', { name: 'Motors' });
        this.makeDropdown = page.getByLabel('Make (optional)');
        this.viewListingButton =page.getByRole('button', { name: 'View listings' });
        this.viewResultButton = page.locator('button.tm-drop-down-tag__dropdown-footer-button');
        this.result = page.locator('.tm-motors-search-results__sort-and-view-options h3');
        this.heading = page.locator('.p-h2');
        this.searchBox = page.locator('[name="keyword"]');
        this.searchBar = page.locator('input[placeholder="Search within Cars"]');
        this.clearInput = page.getByRole('button', {name:'Clear input'});
        this.searchCount = page.locator('.tm-search-header-result-count__heading');

    }
    async navigateToMotors(baseURL: string){
        if(!baseURL){
            console.log("BASE_URL  is not defined");
            return;
        }
        await this.page.goto(baseURL, {waitUntil: 'load'});
        await this.page.waitForTimeout(1000);
    }

    async selectMakeDropdown(carMakes: string[]){
        for (let i = 0; i < carMakes.length; i++) {
            console.log(`Selecting ${carMakes[i]} from dropdown`);	  
            if (i === 0) {
              await this.makeDropdown.selectOption(carMakes[i]);
              await this.viewListingButton.click();
              await expect(this.heading).toContainText(`${carMakes[i]} for sale`);
              const resultCount = (await this.result.textContent())?.replace('results','').replace('Showing','');
              console.log(`Counting ${carMakes[i]} search result : `, resultCount);
            } else {
                const makeButton = this.page.getByRole('button', { name: `Make: ${carMakes[i-1]} Open content`});
                await makeButton.click();
                const makeHeader = this.page.getByRole('heading', {name:'Make'});
                await expect(makeHeader).toBeVisible();
                const makeSelector = this.page.locator(`label:has-text("${carMakes[i]}")`);
                await makeSelector.click();
                await this.viewResultButton.click();
                await expect(this.heading).toContainText(`${carMakes[i]} for sale`);
                const resultCount = (await this.result.textContent())?.replace('results','').replace('Showing','');
                console.log(`Counting ${carMakes[i]} search result : `, resultCount);
            }  
            await this.page.waitForTimeout(1000);
        }            
    }

   async searchKeyword(carMakes: string[]){
    for (let i = 0; i < carMakes.length; i++) {
        console.log(`Search ${carMakes[i]}`);
        if(i===0){
            await this.searchBox.fill(carMakes[i]);
            await this.page.keyboard.press('Enter');
            await expect(this.searchCount).toContainText(`${carMakes[i]}`);
            const searchResultCount = (await this.searchCount.textContent())?.replace(`results for '${carMakes[i]}'`,'').replace('Showing','');
            console.log(`Counting ${carMakes[i]} search result : `, searchResultCount);
        }else{
            await this.clearInput.click();
            await this.searchBar.fill(carMakes[i]);
            await this.searchBar.press('Enter');
            await expect(this.searchCount).toContainText(`${carMakes[i]}`);
            const searchResultCount = (await this.searchCount.textContent())?.replace(`results for '${carMakes[i]}'`,'').replace('Showing','');
            console.log(`Counting ${carMakes[i]} search result : `, searchResultCount);
        }
        await this.page.waitForTimeout(1000);
    }
   }
}