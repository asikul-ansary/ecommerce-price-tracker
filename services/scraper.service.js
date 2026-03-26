import { chromium } from 'playwright';
import { AmazonPage } from '../pages/amazon.page.js';
import { FlipkartPage } from '../pages/flipkart.page.js';
import { MyntraPage } from '../pages/myntra.page.js';
import { AjioPage } from '../pages/ajio.page.js';
import { config } from '../config/config.js';
import 'dotenv/config';

export async function scrapeProducts(products) {
  const browser = await chromium.launch({
    headless: process.env.CI ? true : false
  });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
    viewport: { width: 1280, height: 800 },
    locale: 'en-IN'
  });
  console.log(`new context created!!!`);
  const results = [];
  for (const product of products) {
    const page = await context.newPage();
    try {
      let price;
      switch (product.site?.toLowerCase()) {
        // case 'amazon': {
        //   const p = new AmazonPage(page);
        //   await p.open(product.product_url);
        //   price = await p.getPrice();
        //   break;
        // }
        // case 'flipkart': {
        //   const p = new FlipkartPage(page);
        //   await p.open(product.product_url);
        //   price = await p.getPrice();
        //   break;
        // }
        // case 'myntra': {
        //   const p = new MyntraPage(page);
        //   await p.open(product.product_url);
        //   price = await p.getPrice();
        //   break;
        // }
        case 'ajio': {
          console.log(`inside ajio!!!`);
          const p = new AjioPage(page);
          await p.open(product.product_url);
          price = await p.getPrice();
          break;
        }
        default:
          console.warn(`Unsupported site: ${product.site}`);
          break;
      }
      if (price !== undefined) {
        console.log(`price found!!!`);
        results.push({ ...product, currentPrice: price });
      }
      await page.waitForTimeout(config.scraper.delay);
    } catch (err) {
      console.error('Scraping error:', err.message);
    }
    await page.close();
  }
  await browser.close();
  return results;
}