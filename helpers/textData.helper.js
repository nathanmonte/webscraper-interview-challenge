/**
 * Method for getting the title from the document.
 * 
 * @param {Document} document JSDOM Document which can be used to retrieve values.
 * @param {string} url The URL we're collecting the title for.
 * @returns {string} Either returns the value for the title or a backup message.
 */
export const getTitle = (document, url) => {
    const titleTag = document.querySelector("title");
    const titleValue = titleTag ? titleTag.text : "🚨 Title not available for page.";

    console.log(`Title ${titleValue ? "found" : "not found"} for URL ${url}`);

    return titleValue;
};

/**
 * Method for getting the description from the document.
 * 
 * @param {Document} document JSDOM Document which can be used to retrieve values.
 * @param {string} url The URL we're collecting the description for.
 * @returns {string} Either returns the value for the description or a backup message.
 */
export const getDescription = (document, url) => {
    const descriptionTag = document.querySelector("meta[name='description']");
    const descriptionValue = descriptionTag ? descriptionTag.content : "🚨 Description not available for page.";
    console.log(`Description ${descriptionValue ? "found" : "not found"} for URL ${url}`);

    return descriptionValue;
}

/**
 * Method which collects the links from the document, converts them into the optimal format and then ensures they are unique.
 * 
 * @param {Document} document JSDOM Document which can be used to retrieve values.
 * @param {*} domain 
 * @param {string} url The URL we're collecting the links document for.
 * @returns {string[]} Array of links which are on the domain.
 */
export const getLinks = (document, domain, url) => {
    const links = Array.prototype.slice.call(document.querySelectorAll("a")).map(image => image.href);
    const linksWithoutEmpties = links.filter(link => link.length > 0);
    const linksModified = linksWithoutEmpties.map(link => {
        // Add the domain if missing
        if (link[0] === "/") link = `${domain}${link}`;
        // TODO: Review if I want this link type.
        if (link.includes("?")) link = link.split("?")[0];
        return link;
    })

    const linksWithoutNonDomainValues = linksModified.filter(link => link.includes("http://" + domain) || link.includes("https://" + domain));

    const uniqueLinks = Array.from(new Set(linksWithoutNonDomainValues)).sort();

    console.log(`Found ${uniqueLinks.length} links for domain ${domain} on URL ${url}`);

    return uniqueLinks;
}