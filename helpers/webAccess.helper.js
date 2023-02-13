import { JSDOM } from "jsdom";
import fetch from "node-fetch";

/**
 * Method which accesses a URL and returns a document which we can traverse.
 * 
 * @param {string} url The URL we're collecting the JSDOM document for.
 * @returns {Document} Returns a JSDOM document.
 */
export const getDocumentForUrl = async (url) => {
    const response = await fetch(url);
    const body = await response.text();

    console.log(`Got page body for URL ${url}`)

    const dom = new JSDOM(body);
    const document = dom.window.document;

    console.log(`Got document for URL ${url}`);

    return document;
}