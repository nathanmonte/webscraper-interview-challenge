/**
 * Returns urls we haven't yet processed.
 * 
 * @param {string[]} urls A list of urls we've captured from.
 * @param {string[]} knownUrls List of urls which we have previously captured.
 * @returns {string[]} List of new URls which haven't been captured yet.
 */
export const removeAlreadyProcessedUrls = (urls, knownUrls) => {
    return urls.filter(url => !knownUrls.includes(url));
} 