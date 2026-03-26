import { getProducts, updatePriceHistory } from '../services/db.service.js';
import { scrapeProducts } from '../services/scraper.service.js';
import { shouldNotify } from '../services/compare.service.js';
import { sendMail } from '../services/mail.service.js';
import { log } from '../utils/logger.js';

(async () => {
  try {
    log('Starting tracker...');
    const products = await getProducts();
    console.log('Products from DB:', products);
    const results = await scrapeProducts(products);
    for (const item of results) {
      // Save history
      await updatePriceHistory(item._id, item.currentPrice);
      // Notify
      if (shouldNotify(item.currentPrice, item.expected_price)) {
        log(`Sending alert for ${item.product_url} to ${item.email}`);
        await sendMail(item.email, item, item.currentPrice);
      }
    }
    log('Completed Run!!!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();