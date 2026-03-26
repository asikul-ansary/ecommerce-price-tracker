# 🛒 Ecommerce Price Tracker (Playwright + MongoDB)

An automated price tracking system built using Playwright, Node.js, and MongoDB Atlas.

## 🚀 Features

- Multi-site scraping (Amazon, Flipkart, Myntra, Ajio)
- MongoDB Atlas cloud database
- Email notifications using Nodemailer
- Playwright automation
- GitHub Actions pipeline (auto run)
- Page Object Model (POM) structure

---

## 📂 Project Structure

```
ecommerce-price-tracker/
│
├── config/
│   └── config.js
│
├── pages/
│   ├── AmazonPage.js
│   ├── FlipkartPage.js
│   ├── MyntraPage.js
│   └── AjioPage.js
│
├── services/
│   ├── db.service.js
│   └── mail.service.js
│
├── utils/
│   └── price.utils.js
│
├── runner/
│   └── run.js
│
├── tests/
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```
git clone <your-repo-url>
cd ecommerce-price-tracker
```

---

### 2️⃣ Install Dependencies

```
npm install
npx playwright install
```

---

### 3️⃣ Setup Environment Variables

Create `.env` file:

```
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&tls=true
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your_app_password
```

⚠️ Notes:
- Encode special characters in password (`@ → %40`)
- Do NOT commit `.env`

---

### 4️⃣ Setup MongoDB Atlas

1. Create free cluster (M0)
2. Create DB user (Read & Write access)
3. Add Network Access:
```
0.0.0.0/0
```
4. Create database:

```
Database: pricer_tracker
Collection: products
```

---

### 5️⃣ Insert Sample Data

```
{
  "product_url": "https://www.flipkart.com/...",
  "expected_price": 5000,
  "email": "your-email@gmail.com",
  "site": "flipkart",
  "price_history": []
}
```

---

## ▶️ Run Locally

```
npm run track
```

---

## 📧 Email Setup

- Enable Gmail 2FA
- Generate App Password
- Use in `.env`

---

## 🧠 Price Comparison Logic

```
export function shouldNotify(current, expected) {
  return current <= expected;
}
```

---

## 🤖 GitHub Actions Setup

### Create Workflow

Path:
```
.github/workflows/tracker.yml
```

```
name: Price Tracker

on:
  workflow_dispatch:
  schedule:
    - cron: "0 */6 * * *"

jobs:
  run:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm install
      - run: npx playwright install --with-deps

      - name: Run tracker
        run: npm run track
        env:
          DB_URL: ${{ secrets.DB_URL }}
          MAIL_USER: ${{ secrets.MAIL_USER }}
          MAIL_PASSWORD: ${{ secrets.MAIL_PASSWORD }}
```

---

### Add GitHub Secrets

Go to:
Settings → Secrets → Actions

Add:

- DB_URL
- MAIL_USER
- MAIL_PASSWORD

---

### Run Manually

- Go to Actions tab
- Select workflow
- Click "Run workflow"

---

## ⚠️ Common Issues

### MongoDB TLS Error

```
ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR
```

Fix:
- Add `0.0.0.0/0` in Network Access
- Correct connection string
- Encode password

---

### Empty DB Data

```
Products from DB: []
```

Fix:
- Check DB name
- Check collection name
- Verify connection string

---

### Site Blocking (AJIO / Amazon)

Fix:
- Use real Chrome (`channel: 'chrome'`)
- Run headed mode
- Add delays

---

## 🚀 Future Improvements

- Proxy rotation
- Retry mechanism
- Price history tracking
- Dashboard UI
- Multi-user support

---

## 🧑‍💻 Author

Asikul Ansary

---

## ⭐ Notes

- Production-ready base
- Scalable architecture
- Real-world automation use case

---