
import { getImageSources } from "./helpers/images.helper.js";
import { getDescription, getLinks, getTitle } from "./helpers/textData.helper.js";
import { getDocumentForUrl } from "./helpers/webAccess.helper.js";

(async () => {

    const url = 'https://www.github.com';
    const domain = "https://github.com";
    const domainLocation = "github.com"

    const document = await getDocumentForUrl(url);

    const description = getDescription(document);

    const pageData = {
        imageSources: getImageSources(document, domainLocation),
        title: getTitle(document),
        description: description ? description : "🚨 Description not available for page.",
        links: getLinks(document, domain)
    }

    
    console.log(pageData);
})();
    