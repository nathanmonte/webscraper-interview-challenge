
import { appendFile, writeFile } from "fs/promises";
import { getPageData } from "./helpers/pageData.helper.js";
import { removeAlreadyProcessedUrls } from "./helpers/urlProcessing.helper.js";

const url = process.argv[2];

if (!url) {
    console.error("You must provide a URL to the program as the third parameter.");
    process.exit();
}

// We want to capture the domain and the urlHost
const urlEntity = new URL(url);
const domain = urlEntity.origin;
const urlHost = urlEntity.host;

let fileLocation = `./json-results/${urlHost}-results.json`; 

// Create arrays to handle ach part of the URL processing.
let processedUrls = [], urlQueue = [url];

// Start file with an opening "["
await writeFile(fileLocation, "[", "utf8");

// While the url queue contains links to pages to process we should run this loop.
while (urlQueue.length > 0) {
    // We should take the first item from queue.
    let processingUrl = urlQueue.splice(0,1)[0];
    console.log(`Processing url: ${processingUrl}`);

    // Collect the page data for the URL we're currently processing.
    let pageData = await getPageData(processingUrl, urlHost, domain);
    console.log(`Collected page data for url: ${processingUrl}`);

    // Add the new links we've found removing any in the processed list or the queue.
    let newUrlsForProcessing = removeAlreadyProcessedUrls(pageData.links, [...processedUrls, ...urlQueue]);
    // Reconstruct the URL queue to have the new URLs included.
    urlQueue = [...urlQueue, ...newUrlsForProcessing];

    console.log(`URL Queue now length of ${urlQueue.length}\n\n`);
    
    // Push the URL to the processed list so we don't process it again.
    processedUrls.push(processingUrl);

    // Convert the page data into JSON and append a comma to it so we can immediately save the result to the file.
    let jsonString = `${JSON.stringify(pageData)}${urlQueue.length > 0 ? "," : ""}`;

    // Immediately save the page data to the json result file.
    await appendFile(fileLocation, jsonString, "utf8");
}

// End file with an opening "]"
await appendFile(fileLocation, "]", "utf8");