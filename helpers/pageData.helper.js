import { getSourcesForAssetTypeFromPage } from "./assets.helper.js";
import { getDescription, getLinks, getTitle } from "./textData.helper.js";
import { getDocumentForUrl } from "./webAccess.helper.js";

export const getPageData = async (url) => {
    const domain = "https://carthrottle.com";
    const domainLocation = "carthrottle.com";

    const document = await getDocumentForUrl(url);

    return {
        url,
        title: getTitle(document, url),
        description: getDescription(document, url),
        links: getLinks(document, domain, url),
        assets: {
            imageSources: getSourcesForAssetTypeFromPage(document, domainLocation, url, "img"),
            scripts: getSourcesForAssetTypeFromPage(document, domainLocation, url, "script"),
            stylesheets: getSourcesForAssetTypeFromPage(document, domain, url, "link[rel='stylesheet']"),
            iFrames: getSourcesForAssetTypeFromPage(document, domain, url, "iframe"),
        }
    }
}