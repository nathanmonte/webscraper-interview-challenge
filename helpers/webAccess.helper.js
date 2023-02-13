import { JSDOM } from "jsdom";
import fetch from "node-fetch";

export const getDocumentForUrl = async (url) => {
    const response = await fetch(url);
    const body = await response.text();

    console.log(`Got page body for URL ${url}`)

    const dom = new JSDOM(body);
    const document = dom.window.document;

    console.log(`Got document for URL ${url}`);

    return document;
}