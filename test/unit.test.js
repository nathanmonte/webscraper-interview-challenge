import fs from 'fs';
import { JSDOM } from "jsdom";
import path from 'path';
import { getSourcesForAssetTypeFromPage } from '../helpers/assets.helper.js';
import { getDescription, getLinks, getTitle } from '../helpers/textData.helper.js';


/** Get a string with a HTML page contained it so we can test our selector methods. */
let htmlTextData = fs.readFileSync(path.resolve(__dirname, 'examplePage.txt'), 'utf8');

/** Create a virtual DOM and access the document so we can run out selector methods. */
const dom = new JSDOM(htmlTextData);
const document = dom.window.document;
const url = "https://www.google.com";

const domain = "google.com";

test("Retrieves the title from the document", () => {
    const title = getTitle(document, url);
    expect(title).toMatchInlineSnapshot(`"Document For Testing"`);
});

test("Retrieves the description field when available.", () => {
    const description = getDescription(document, url);
    expect(description).toMatchInlineSnapshot(`"This is the description for the page."`);
});

test("Retrieves list of links from the page", () => {
    const links = getLinks(document, domain, url);
    expect(links).toMatchInlineSnapshot(`
[
  "https://google.com/about",
  "https://google.com/offers",
]
`);
});

test("Retrieves list of image src properties from the page", () => {
    const images = getSourcesForAssetTypeFromPage(document, domain, url, "img");
    expect(images).toMatchInlineSnapshot(`
[
  "https://images.cdn.google.com/image/2/100/100/5/assets/img/user.jpg",
  "https://images.cdn.google.com/image/2/100/100/5/uploads/profile/1dfbe0ab0a30d2e58a070854169ecbb1.jpg",
]
`);
});

test("Retrieves list of script files from the page", () => {
  const scriptFiles = getSourcesForAssetTypeFromPage(document, domain, url, "script");
  expect(scriptFiles).toMatchInlineSnapshot(`
[
  "https://google.com/assets/scriptFile.js",
  "https://google.com/assets/script2.js",
]
`);
});

test("Retrieves list of stylesheets from the page", () => {
  const stylesheets = getSourcesForAssetTypeFromPage(document, domain, url, "link[rel='stylesheet']");
  expect(stylesheets).toMatchInlineSnapshot(`
[
  "https://www.google.com/wp/wp-includes/css/dashicons.min.css?ver=6.0.3",
  "https://www.google.com/wp-content/themes/bp-hope/dist/main.css?ver=1.0",
]
`);
})
test("Retrieves list of iframes from the page", () => {
  const iframes = getSourcesForAssetTypeFromPage(document, domain, url, "iframe");
  expect(iframes).toMatchInlineSnapshot(`
[
  "https://videos.google.com/video1",
]
`);
})