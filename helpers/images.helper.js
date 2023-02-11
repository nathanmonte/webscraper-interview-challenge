const checkImageIsFromDomain = (imageSrc, domain) => {
    const regexForMatchingDomain = new RegExp("http[s]?:.*\.?" + domain);
    console.log(imageSrc.match(regexForMatchingDomain));
    return imageSrc.length > 0 && imageSrc.match(regexForMatchingDomain);
}

export const getImageSources = (dom, domain) => {
    const images = dom.window.document.querySelectorAll("img");
    const imageSources = Array.prototype.slice.call(images).map(image => image.src);
    console.log(imageSources);
    return imageSources.filter(imageSrc => checkImageIsFromDomain(imageSrc, domain));
}