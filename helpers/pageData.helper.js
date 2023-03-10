import { getSourcesForAssetTypeFromPage } from "./assets.helper.js";
import { getDescription, getLinks, getTitle } from "./textData.helper.js";
import { getDocumentForUrl } from "./webAccess.helper.js";

/**
 * Method provides an object which includes all of the data we care about for the page.
 * 
 * @param {string} url The URL we're collecting the assets for.
 * @returns {Object} Returns an object with the data we've secured from the page.
 */
export const getPageData = async (url, urlHost, domain) => {
    console.log(`Getting page data for ${url}`);

    const document = await getDocumentForUrl(url);

    return {
        url,
        title: getTitle(document, url),
        description: getDescription(document, url),
        links: getLinks(document, domain, url),
        assets: {
            imageSources: getSourcesForAssetTypeFromPage(document, urlHost, url, "img"),
            scripts: getSourcesForAssetTypeFromPage(document, urlHost, url, "script"),
            stylesheets: getSourcesForAssetTypeFromPage(document, domain, url, "link[rel='stylesheet']"),
            iFrames: getSourcesForAssetTypeFromPage(document, domain, url, "iframe"),
        }
    }
}