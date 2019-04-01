const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

var browser;
async function loadBrowser() {
  browser = await puppeteer.launch();
  return browser;
}
async function closeBrowser() {
  await browser.close();
}
class Requests {
  static async loadPage(url) {
    const browser = await loadBrowser();
    const page = await browser.newPage();
    await page.goto(url);
    return page;
  }

  static async getTitle(url) {
    let page = await this.loadPage(url);
    let content = await page.content();
    let $ = cheerio.load(content);
    const title = await $("title").text();
    await closeBrowser();
    return title;
  }

  static async screenshotPage(url) {
    let page = await this.loadPage(url);
    await page.screenshot({ path: __dirname + "/screenshots/test.png" });
    await closeBrowser();
  }
}
module.exports = Requests;
