const checkImageIsFromDomain = (imageSrc, domain) => {
    const regexForMatchingDomain = new RegExp("http[s]?:.*\.?" + domain);
    return imageSrc.length > 0 && imageSrc.match(regexForMatchingDomain);
}

export const getImageSources = (document, domain) => {
    const images = document.querySelectorAll("img");
    const imageSources = Array.prototype.slice.call(images).map(image => image.src);
    const imagesFromDomain = imageSources.filter(imageSrc => checkImageIsFromDomain(imageSrc, domain))
    console.log(`Found ${imagesFromDomain.length} images on page which are located on the ${domain} domain.`);
    return imagesFromDomain;
}