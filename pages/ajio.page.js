export class AjioPage {
    constructor(page) {
        this.page = page;
        this.selectors = [
            '.prod-sp',
            '.price strong',
            'text=/₹\\s?[0-9,]+/'
        ];
    }

    async open(url) {
        await this.page.goto(url, { waitUntil: 'networkidle' });
        await this.page.waitForTimeout(4000);
    }

    async getPrice() {
        for (const sel of selectors) {
            const loc = this.page.locator(sel);
            if (await loc.count() > 0) {
                const text = await loc.first().textContent();
                const price = parseFloat(text.replace(/[^0-9]/g, ''));
                if (!isNaN(price)) return price;
            }
        }

        throw new Error('Ajio price not found');
    }
}