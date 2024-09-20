import { Page } from "@playwright/test";

export class getProductResponse {
    readonly path:any;
    readonly request;
    readonly page:Page;
    readonly size:String;

    constructor(path:any, request, page:Page, size:String){
        this.path = path;
        this.request = request;
        this.page =page;
        this.size = size;

    }

    async getResponse(){
        let products;
        await this.request.get(this.path,{
            headers:{
                'Accept': 'application/json, text/plain, /'
            }
        })
        .then(res => res.json())
        .then(data => {
            products = data.products
        })

        return products;

    }

    async productsBySize(){
        let productsBySizeList:String[] = [];
        const products = await this.getResponse();
        for(let i=0;i<products.length;i++){
            if(products[i].availableSizes.includes(this.size)){
                productsBySizeList = [...productsBySizeList, products[i]]
            }
        }
        return productsBySizeList;
    }

}