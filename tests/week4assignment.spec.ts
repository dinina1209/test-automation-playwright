import { test, expect, request } from '@playwright/test';
const {getProductResponse} = require('./API/getProductResponse');
const {ShoppingPage} = require('./Pages/ShoppingPage');

const apiPath = 'https://react-shopping-cart-67954.firebaseio.com/products.json'
const size = 'L'

test.describe('E-commerce site', ()=>{
  let shoppingPage;

  test.beforeEach(async({page})=>{
    shoppingPage = new ShoppingPage(page, size);
    await shoppingPage.navigateToShop();
  });

  test('filter by size and validate it', async ({ request, page }) => {
    const apiRequest = new getProductResponse(apiPath, request, page, size);
    const shoppingPage = new ShoppingPage(page, size);
    
    await test.step("Given I click the size button", async()=>{
      await shoppingPage.filterBySize();
    });
    
    await test.step("I can verify products are filter by size", async()=>{
      const getProductsBySize = await apiRequest.productsBySize();
      await page.waitForTimeout(500);
      const filteredProductCount = await shoppingPage.getProductCount();

      expect(getProductsBySize.length).toEqual(filteredProductCount);
    });    
  });

  test('Adding products to the cart', async() => {
    await test.step('Given I add 2products to the cart', async()=>{
      await shoppingPage.addProductToCart(2);
      await shoppingPage.addProductToCart(4);
    });
    
    await test.step('I can validate the total amount of item is correct', async()=>{
      await shoppingPage.clickCartButton();
      const countCartItem = await shoppingPage.countCartItem();
      const getCartIconCount = await shoppingPage.getCartIconCount();
      expect(countCartItem).toEqual(getCartIconCount);
    });
  });

  test('Removing product from the cart', async()=>{
    await test.step('Given I remove products from the cart', async()=>{
      await shoppingPage.addProductToCart(2);
      await shoppingPage.addProductToCart(4);
      await shoppingPage.addProductToCart(6);
      await shoppingPage.addProductToCart(7);
      await shoppingPage.clickCartButton();     
    });
    
    await test.step('I can validate deleted products no more in the cart', async()=>{
      const deleteProduct = await shoppingPage.deleteProduct(2);
      const cartItemList = await shoppingPage.getCartItemTitleList();
      expect(cartItemList.includes(deleteProduct)).toBeFalsy();  
    });    
  });

  test('Confirm the total Price and the Subtotal', async()=>{
    await test.step('Given I added multiple products in the cart', async()=>{
      await shoppingPage.addProductToCart(2);
      await shoppingPage.addProductToCart(4);
      await shoppingPage.addProductToCart(7);
      await shoppingPage.clickCartButton();
    })
   
    await test.step('Validate totla price is same as subtotal', async()=>{
      const getTotalPrice = await shoppingPage.getTotalPrice();
      const getSubtotal = await shoppingPage.getSubtotal();
      expect(getTotalPrice).toEqual(getSubtotal);
    }); 
  });

  test('The checkout works as expected', async({page})=>{
    await test.step('Given I add multiple items to the cart', async()=>{
      await shoppingPage.addProductToCart(1);
      await shoppingPage.addProductToCart(5);
      await shoppingPage.addProductToCart(9);
      await shoppingPage.clickCartButton();  
    })
    
    await test.step('I can validate the total is reflectedon the Checkout modal', async()=>{
      const cartTotalPrice = await page.locator(`.sc-1h98xa9-9.jzywDV`).textContent();
      page.on(`dialog`, async dialog => {
        expect(dialog.message()).toContain(`Checkout - Subtotal: ${cartTotalPrice}`);
        await dialog.dismiss();
      });

      await shoppingPage.clickCheckoutButton();
    });
    await shoppingPage.clickCheckoutButton();
  });
}); 




