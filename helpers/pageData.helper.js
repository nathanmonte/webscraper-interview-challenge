import { getImageSources } from "./images.helper.js";
import { getDescription, getLinks, getTitle } from "./textData.helper.js";
import { getDocumentForUrl } from "./webAccess.helper.js";

export const getPageData = async (url) => {
    const domain = "https://carthrottle.com";
    const domainLocation = "carthrottle.com";

    const document = await getDocumentForUrl(url);

    return {
        url,
        imageSources: getImageSources(document, domainLocation),
        title: getTitle(document, url),
        description: getDescription(document, url),
        links: getLinks(document, domain, url)
    }
}