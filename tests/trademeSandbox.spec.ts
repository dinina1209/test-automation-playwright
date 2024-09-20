import { test, request } from '@playwright/test';
const {getMotorResponse} = require('./API/getMotorResponse');

test.describe('Automate TradeMe Sandbox API ', () => {
  const carMakes:string[] = ['Toyota', 'Jaguar', 'Bentley', 'Honda']
  const baseURL = 'https://api.tmsandbox.co.nz/v1/search/general.json';
  const consumerKey = process.env.consumerKey;
  const consumerSecret = process.env.consumerSecret;
  const motorsResponse = new getMotorResponse(consumerKey,consumerSecret, request, baseURL);
  
  test('Validate available make from dropdown', async () => {
    for(let i=0; i<carMakes.length; i++){
      await test.step(`Given I select ${carMakes[i]} from drop down, I can validate search result count`, async()=>{
        await motorsResponse.getDropdownTotalCount(carMakes[i]); 
      })
    }
  });

  test('Validate availalbe make from searchbox', async () => {
    for(let i=0; i<carMakes.length; i++){
      await test.step(`Given I search for ${carMakes[i]}, I can validate search result count`, async()=>{
        await motorsResponse.getSearchBarTotalCount(carMakes[i]); 
      });
    }
  })
});
