import { Page, Locator } from "@playwright/test";
require('dotenv').config;

const baseURL = process.env.URL;

export class ShoppingPage{
    readonly path:string;
    readonly page:Page;
    readonly size:string | RegExp;
    readonly sizeButton: Locator;
    readonly addToCartButton: Locator;
    readonly closeCartButton : Locator;
    readonly cartButton : Locator;
    readonly cartItem : Locator;
    readonly cartItemTitle : Locator;
    readonly cartItemCount : Locator;
    readonly deleteButton : Locator;
    readonly productPrice : Locator;
    readonly cartProductDetail: Locator;
    readonly subTotal: Locator;
    readonly checkoutButton : Locator;
    //readonly sizeFilter : (size: string)=> Locator;

    constructor(page:Page, size:string | RegExp){
       //this.sizeFilter = (size: string) => page.getByText(`${size}`, {exact:true});
       this.size = size;
       this.sizeButton = page.getByText(size, {exact:true});
       this.addToCartButton = page.getByRole('button', {name:'Add to cart'});
       this.closeCartButton = page.getByRole('button', {name:'X'});
       this.cartButton = page.locator('.sc-1h98xa9-0');
       this.cartItem = page.locator('.sc-11uohgb-0');
       this.cartItemTitle = page.locator('.sc-11uohgb-2');
       this.cartItemCount = page.locator('.sc-1h98xa9-3');
       this.deleteButton = page.getByRole('button', { name: 'remove product from cart' });
       this.productPrice = page.locator('.sc-11uohgb-4').locator('p');
       this.cartProductDetail = page.locator('.sc-11uohgb-3');
       this.subTotal = page.locator('.sc-1h98xa9-9');
       this.checkoutButton = page.getByRole('button', {name:'Checkout'});
       this.page = page;
       //page.goto(baseURL);
    }

    async navigateToShop(){
        if(!baseURL){
            console.log("BASE_URL  is not defined");
            return;
        }
        await this.page.goto(baseURL);
        //console.log('baseURL in shopingpage', baseURL);
        await this.page.waitForTimeout(1000)
        //await this.page.waitForURL(baseURL);
    }

    async getProductCount(){
        return await this.addToCartButton.count();
    }

    async filterBySize(){
        await this.page.waitForURL("https://react-shopping-cart-67954.firebaseapp.com/");
        await this.sizeButton.click();
    }

    async addProductToCart(index:number){
        await this.addToCartButton.nth(index).click();
        await this.closeCartButton.click();
    }
    
    async clickCartButton(){
        await this.cartButton.click();
    }

    async countCartItem(){
        await this.cartItem.count()
    }

    async getCartIconCount(){
        Number(await this.cartItemCount.textContent());
    }
    
    async deleteProduct(index:number){
        const deleteProduct = await this.cartItemTitle.nth(index).textContent();
        await this.deleteButton.nth(index).click()
        return deleteProduct;
    }

    async getCartItemTitleList(){
        let cartProductList: string[] | null =[];
        const cartItemTitle = this.cartItemTitle;
        const cartItemCount = await cartItemTitle.count();

        for(let i=0; i< cartItemCount; i++){
            const itemTitle = await cartItemTitle.nth(i).textContent();
            cartProductList = [...cartProductList, ...(itemTitle as string)]
            
        }
        return cartProductList;
    }

    async getTotalPrice(){
        const productPrice = this.productPrice;
        const count = await productPrice.count();
        let totalPrice =0;
        for(let i=0; i<count; i++){
           const price = await productPrice.nth(i).textContent();
           const convertPrice = Number(price?.replace("$  ", ""));
           const productDetail = await this.cartProductDetail.nth(i).textContent();
           const extractQty= productDetail?.split("<br>").toString();
           const qty = Number(extractQty?.slice(-1));
           totalPrice += convertPrice*qty
        }

        return totalPrice.toFixed(2);
    }

    async getSubtotal(){
        const subTotal = (await this.subTotal.textContent())?.replace("$ ","");
        return Number(subTotal).toFixed(2);
    }

    async clickCheckoutButton(){
        await this.checkoutButton.waitFor({state:'visible'});
        await this.checkoutButton.click();
    }

}