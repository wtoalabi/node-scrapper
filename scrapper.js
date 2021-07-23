const {project, urls} = require("./project_file");
const {Scraper, Root, DownloadContent, OpenLinks, CollectContent} = require('nodejs-web-scraper');

const fs = require('fs');

let path = fs.mkdirSync(`./blogs/${project}`, {recursive: true});

for (let i = 0; i < urls.length; i++) {
  sleep(5000).then(function () {
    let url = urls[i];
    let parsedUrl = new URL(url);
    let path = parsedUrl.pathname;
    let title = path.slice(1, path.length - 1);
    let trimmed = title.split('/');
    let trimmed_title = trimmed[trimmed.length - 1]
    //console.log(url, title);
    scrap(url, trimmed_title).then(function (result) {
      console.log(result)
    });
  });
}

async function scrap(url, title) {

  const config = {
    baseSiteUrl: url,
    startUrl: url,
    concurrency: 10,//Maximum concurrent jobs. More than 10 is not recommended.Default is 3.
    maxRetries: 9,//The scraper will try to repeat a failed request few times(excluding 404). Default is 5.
    logPath: `./logs/`//Highly recommended: Creates a friendly JSON for each operation object, with all the relevant data.
  }


  const scraper = new Scraper(config);//Create a new Scraper instance, and pass config to it.

  //Now we create the "operations" we need:

  const root = new Root();//The root object fetches the startUrl, and starts the process.
  const article = new CollectContent('article .entry-content', {name: 'article'});
  //Any valid cheerio selector can be passed. For further reference: https://cheerio.js.org/
  root.addOperation(article);//Then we create a scraping "tree":

  await scraper.scrape(root);


  const articles = article.getData();//Will return an array of all article objects(from all categories), each

  //console.log(path);
  fs.writeFile(`./blogs/${project}/${title}.txt`, JSON.stringify(articles[0]), () => {
  })//Will produce a formatted JSON containing all article pages and their selected data.

};

function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}
