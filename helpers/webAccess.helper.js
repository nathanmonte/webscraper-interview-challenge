import { JSDOM } from "jsdom";
import fetch from "node-fetch";

export const getDocumentForUrl = async (url) => {
    const response = await fetch(url);
    const body = await response.text();

    const dom = new JSDOM(body);
    const document = dom.window.document;

    return document;
}