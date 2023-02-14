# Simple web scraper

This project contains a simple web scraper capable of taking a URL and exploring the links found on the pages within the site.

## How to run

- Project requires a minimum node version of 14 to run.
- You will need to install dependencies using yarn by running `yarn`
- You can run the web scraper by calling `yarn start URL` where URL is a web page which you want to scrape.
- The process takes a reasonable amount of time for pages as large as the ones provided as examples. A good test is the following: `yarn start https://www.plymouthsoftware.com/articles/`

### Results

- Results will be stored in JSON files in the json-results folder in the root of the project. The file is named using the host name.

## Testing

- This project also contains some basic testing for for methods in the application.
- To run these tests please run `yarn test`.
