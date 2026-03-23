export class AmazonPage {
  constructor(page) {
    this.page = page;
    this.selectors = [
      '.a-offscreen',
      'text=/₹\\s?[0-9,]+/'];
  }

  async open(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async getPrice() {
    for (const sel of this.selectors) {
      const loc = this.page.locator(sel);
      if (await loc.count() > 0) {
        const text = await loc.first().textContent();
        const price = parseFloat(text.replace(/[^0-9]/g, ''));
        if (!isNaN(price)) return price;
      }
    }
    throw new Error('Amazon price not found');
  }
}