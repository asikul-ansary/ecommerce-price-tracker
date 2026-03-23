export class FlipkartPage {
  constructor(page) {
    this.page = page;
    this.selectors = [
      '._30jeq3._16Jk6d',
      '._30jeq3',
      'text=/₹\\s?[0-9,]+/'];
  }

  async open(url) {
    await this.page.goto(url);
    // Close login popup
    const closeBtn = this.page.locator('button:has-text("✕")');
    if (await closeBtn.isVisible().catch(() => false)) {
      await closeBtn.click();
    }
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
    throw new Error('Flipkart price not found');
  }
}