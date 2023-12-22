import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
        "https://www.niche.com/api/renaissance/results/?type=private&type=public&listURL=best-colleges&page=1&searchType=college"
    );
    const content = await page.content();
    console.log(content);
    await browser.close();
})();
