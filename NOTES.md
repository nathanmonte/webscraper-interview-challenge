# On the challenge

There are a few complexities with building a generalised web scraper which I've explored below.

## Why Node.js streams paired with a DB would provide better support for larger pages.

Some of the sites provided as examples are massive. Medium has a million+ pages. Building a scraper for this would require a system which doesn't keep the data in memory as you would exceed the amount of memory allocated to the node process. For this it would be best to use a stream which outputs to a database which captures all of the required data. This process is more complicated to design but provides a better experience for data access, better memory management, and a cleaner process.

## On a "site-map".

One of the parts of the challenge I found most confusing is the statement "some form of site map / list of pages". I've chosen to go with a list of pages here as providing a sitemap for an entire site has some complexities I don't feel are easily solved.

One of the chief complexities is that a nesting structure or some kind of id / reference system would be required to associate data to key pages whilst also supporting the need for the metadata for each page.

Site maps are typically a much simpler structure and don't include every page on the site, but the types of pages available on a site. For a site like Medium a blog post page would be a type of page, rather than storing every blog post page as part of a sitemap.