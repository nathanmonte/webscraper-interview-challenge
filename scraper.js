
import { getPageData } from "./helpers/pageData.helper.js";

const url = process.argv[2];

/**
 * Initially return a single page data object.
 * When this returns it will come with a list of urls.
 * We want to take these urls and add them to an array.
 * We will then cycle through the array one by one and create page objects.
 */


const pageData = await getPageData(url);
let {links} = pageData;
const promiseArray = links.map((link) => getPageData(link));
const pageDataArray = await Promise.all(promiseArray);

console.log(pageDataArray);

/**
 * Request => list of links
 * Use a recursive function.
 */