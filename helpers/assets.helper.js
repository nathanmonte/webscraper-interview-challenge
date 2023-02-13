const checkAssetIsForDomain = (assetSrc, domain) => {
    const regexForMatchingDomain = new RegExp("http[s]?:.*\.?" + domain);
    return assetSrc.length > 0 && assetSrc.match(regexForMatchingDomain);
}

export const getSourcesForAssetTypeFromPage = (document, domain, url, assetType) => {
    let valueAttribute = "src";
    if (assetType.includes("link")) valueAttribute = "href";
    let assets = document.querySelectorAll(assetType);
    const assetSources = Array.prototype.slice.call(assets).filter(asset => asset[valueAttribute]).map(asset => asset[valueAttribute]);
    const onlyAssetsFromDomain = assetSources.filter(assetSrc => checkAssetIsForDomain(assetSrc, domain));
    console.log(`Found ${onlyAssetsFromDomain.length} ${assetType} on page which are located on the ${domain} domain for URL ${url}.`);
    return onlyAssetsFromDomain
}