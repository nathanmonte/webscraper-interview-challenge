import { JSDOM } from "jsdom";
import fetch from "node-fetch";
import { getImageSources } from "./helpers/images.helper";



(async () => {

    const url = 'https://www.github.com';
    const domain = "github.com";

    const response = await fetch(url);
    const body = await response.text();

    const dom = new JSDOM(body);

    const imageSources = getImageSources(dom, domain);
    
    console.log(imageSources);
})();
    