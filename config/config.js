import 'dotenv/config';

export const config = {
  mongo: {
    uri: process.env.DB_URL,
    dbName: 'pricer_tracker'
  },

  mail: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  },

  scraper: {
    headless: false,
    delay: 2000
  }
};