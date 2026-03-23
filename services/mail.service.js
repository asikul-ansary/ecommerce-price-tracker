import nodemailer from 'nodemailer';
import { config } from '../config/config.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.mail.user,
    pass: config.mail.pass
  }
});

export async function sendMail(to, product, price) {
  try {
    await transporter.sendMail({
      from: config.mail.user,
      to,
      subject: '🔥 Price Drop Alert!',
      text: `Price dropped to ₹${price}\n${product.product_url}`,
      html: `
        <div style="font-family: Arial;">
        <h2 style="color: green;">🔥 Price Dropped below ₹${product.expected_price} in ${product.site}</h2>
        <p><b>New Price:</b> ₹${price}</p>
        <a href="${product.product_url}" 
          style="background:#2874f0;color:white;padding:10px;text-decoration:none;">
          View Product
        </a>
      </div>
      `
    });
    console.log('Email sent');
  } catch (err) {
    console.error('Email failed:', err.message);
  }
}