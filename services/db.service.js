import { MongoClient } from 'mongodb';
import { config } from '../config/config.js';

const client = new MongoClient(config.mongo.uri);

export async function getCollection() {
  console.log(`connect string: ${config.mongo.uri}`);
  await client.connect();
  const db = client.db(config.mongo.dbName);
  return db.collection('products');
}

export async function getProducts() {
  const collection = await getCollection();
  return await collection.find({}).toArray();
}

export async function updatePriceHistory(id, price) {
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
}