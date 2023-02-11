export const getTitle = (document) => document.querySelector("title").text;

export const getDescription = (document) => document.querySelector("meta[name='description']").content;

export const getLinks = (document, domain) => {
    const links = Array.prototype.slice.call(document.querySelectorAll("a")).map(image => image.href);
    const linksWithoutEmpties = links.filter(link => link.length > 0);
    const linksModified = linksWithoutEmpties.map(link => {
        // Add the domain if missing
        if (link[0] === "/") link = `${domain}${link}`;
        // TODO: Review if I want this link type.
        if (link.includes("?")) link = link.split("?")[0];
        return link;
    })
    
    const linksWithoutNonDomainValues = linksModified.filter(link => link.includes("http://") || link.includes("https://"));

    const uniqueDomains = Array.from(new Set(linksWithoutNonDomainValues)).sort();

    return uniqueDomains;
}