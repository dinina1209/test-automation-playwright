import { test, expect } from '@playwright/test';
const {TradeMepage} = require('./Pages/TradeMePage');

test.describe('TradeMe Motors automation', ()=>{
  const carMakes:string[] = ['Ferrari', 'BMW', 'Mazda', 'Honda'];
  const baseURL:string = "https://www.trademe.co.nz/a/motors";
  let trademePage;

  test.beforeEach(async ({ page }) => {
    trademePage = new TradeMepage(page);
    await trademePage.navigateToMotors(baseURL);  
  });
  
  test('Select car from Make dropdown', async () => {   
        await trademePage.selectMakeDropdown(carMakes);
  });

  test('Search keyword from the search bar pom', async () => {
    await trademePage.searchKeyword(carMakes);
  });
  
});