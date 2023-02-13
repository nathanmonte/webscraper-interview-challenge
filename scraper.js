
import { writeFile } from "fs/promises";
import { getPageData } from "./helpers/pageData.helper.js";

const url = process.argv[2];

const urlEntity = new URL(url);
const domain = urlEntity.origin;
const domainLocation = urlEntity.host;



/**
 * Initially return a single page data object.
 * When this returns it will come with a list of urls.
 * We want to take these urls and add them to an array.
 * We will then cycle through the array one by one and create page objects.
 */


const pageData = await getPageData(url, domainLocation, domain);

let {links} = pageData;
console.log(pageData);
const promiseArray = links.map(async (link) => await getPageData(link, domainLocation, domain));
const pageDataArray = await Promise.all(promiseArray);

// console.log(pageDataArray);


await writeFile(`./${domainLocation}-results.json`, JSON.stringify(pageDataArray), "utf8");
/**
 * Request => list of links
 * Use a recursive function.
 */