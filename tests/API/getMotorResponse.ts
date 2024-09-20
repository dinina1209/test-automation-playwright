import {APIRequest, APIRequestContext } from '@playwright/test';
import { request } from 'http';
import OAuth from 'oauth-1.0a';
import { consumers } from 'stream';
import { URLSearchParams } from 'url';

export class getMotorResponse {
    private consumerKey : string
    private consumerSecret: string
    readonly request;
    private readonly baseURL:URL;

    constructor(consumerKey, consumerSecret, request, baseURL){
        this.consumerKey = consumerKey;
        this.consumerSecret = consumerSecret;
        this.request = request;
        this.baseURL = new URL(baseURL);
    }


    async getAPIcontext(): Promise<APIRequestContext>{
        //console.log('1', this.baseURL);
       const oauth = new OAuth({
            consumer: {
                key: this.consumerKey,
                secret: this.consumerSecret
            },
            signature_method: 'PLAINTEXT'
        });

        const requestData = {
            url:  this.baseURL.href,
            method: 'GET',
        };
        
        const oauthHeader = oauth.toHeader(oauth.authorize(requestData));
        
        const apiContext:APIRequestContext = await this.request.newContext({
            baseURL: this.baseURL.href,
            extraHTTPHeaders: oauthHeader
        });
        
        return apiContext

    }
    /**
     * Gets the total count of cars for a given make from the TradeMe Motors API
     *
     * @param {string} make - The make of the car to search for
     * @returns {Promise<number>} The total count of cars for the given make
     */
    async getDropdownTotalCount(make: string): Promise<number> {
        this.baseURL.searchParams.set('make', make);
        this.baseURL.searchParams.set('canonical_path', '/motors/cars');

        const apiContext = await this.getAPIcontext();
        const response = await apiContext.get(this.baseURL.href.toString());

        if (!response.ok()) {
            throw new Error(`Error: ${response.status()} - ${response.statusText()}`);
        }

        const responseBody = await response.json();
       
        return responseBody.TotalCount;
    }
    
    async getSearchBarTotalCount(make: string): Promise<number> {
        this.baseURL.searchParams.set('search_string', make);
        this.baseURL.searchParams.set('canonical_path', '/motors/cars');
        
        const apiContext = await this.getAPIcontext();
        const response = await apiContext.get(this.baseURL.href.toString());

        if (!response.ok()) {
            throw new Error(`Error: ${response.status()} - ${response.statusText()}`);
        }

        const responseBody = await response.json();
        return responseBody.TotalCount;
    }

}