import fs from 'fs';
import { JSDOM } from "jsdom";
import path from 'path';
import { getImageSources } from '../helpers/images.helper.js';
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
    const images = getImageSources(document, domain, url);
    expect(images).toMatchInlineSnapshot(`
[
  "https://images.cdn.google.com/image/2/100/100/5/assets/img/user.jpg",
  "https://images.cdn.google.com/image/2/100/100/5/uploads/profile/1dfbe0ab0a30d2e58a070854169ecbb1.jpg",
]
`);
});