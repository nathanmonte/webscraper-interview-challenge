/**
 * Method to check if the asset is from the domain.
 * 
 * @param {string} assetSrc The src of the asset which we want to check the domain portion for.
 * @param {string} domain The domain portion of the URL.
 * @returns {boolean} Returns a boolean value for whether the asset is from the domain.
 */
const checkAssetIsFromDomain = (assetSrc, domain) => {
    const regexForMatchingDomain = new RegExp("http[s]?:.*\.?" + domain);
    return assetSrc.length > 0 && assetSrc.match(regexForMatchingDomain);
}

/**
 * Method to collect a set of urls for assets which are stored on the same domain from a page.
 * 
 * @param {Document} document JSDOM Document which can be used to retrieve values.
 * @param {string} domain The domain portion of the URL.
 * @param {string} url The URL we're collecting the assets for.
 * @param {string} assetType Selector for the asset type we want to select.
 * @returns {string[]} Array of urls for each asset that's located on the domain.
 */
export const getSourcesForAssetTypeFromPage = (document, domain, url, assetType) => {
    let valueAttribute = "src";
    // If the assetType is link then the value is a href not a src.
    if (assetType.includes("link")) valueAttribute = "href";

    // Collect the assets for the document and then convert them into an array
    let assets = document.querySelectorAll(assetType);

    // Filter out any assets with missing valueAttribute and map the valueAttribute to an array.
    const assetSources = Array.prototype.slice.call(assets).filter(asset => asset[valueAttribute]).map(asset => asset[valueAttribute]);

    // Check if the asset is from the domain.
    const onlyAssetsFromDomain = assetSources.filter(assetSrc => checkAssetIsFromDomain(assetSrc, domain));

    console.log(`Found ${onlyAssetsFromDomain.length} ${assetType} on page which are located on the ${domain} domain for URL ${url}.`);

    return onlyAssetsFromDomain
}