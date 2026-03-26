import { MongoClient } from 'mongodb';
import { config } from '../config/config.js';

const client = new MongoClient(config.mongo.uri);

export async function getCollection() {
  await client.connect();
  const db = client.db(config.mongo.dbName);
  return db.collection('products');
}

export async function getProducts() {
  try {
    const collection = await getCollection();
    return await collection.find({}).toArray();
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

export async function updatePriceHistory(id, price) {
  try {
    const collection = await getCollection();

    await collection.updateOne(
      { _id: id },
      {
        $push: {
          price_history: {
            price,
            date: new Date()
          }
        }
      }
    );
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}