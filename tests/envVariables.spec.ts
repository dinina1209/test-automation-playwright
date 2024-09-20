import { test } from "@playwright/test";

test("basic test", async({})=>{
    console.log('url', process.env.URL);
    console.log('username', process.env.USERNAME);
})