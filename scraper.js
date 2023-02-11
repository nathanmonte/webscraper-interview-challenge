
import { getImageSources } from "./helpers/images.helper.js";
import { getDescription, getTitle } from "./helpers/textData.helper.js";
import { getDocumentForUrl } from "./helpers/webAccess.helper.js";

(async () => {

    const url = 'https://www.github.com';
    const domain = "github.com";

    const document = await getDocumentForUrl(url);

    const pageData = {
        imageSources: getImageSources(document, domain),
        title: getTitle(document),
        description: getDescription(document)
    }

    console.log(pageData)
})();
    