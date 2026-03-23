export class MyntraPage {
    constructor(page) {
        this.page = page;
        this.selectors = [
            '.pdp-price strong',
            'text=/₹\\s?[0-9,]+/'];
    }

    async open(url) {
        await this.page.goto(url);
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
        throw new Error('Myntra price not found');
    }
}