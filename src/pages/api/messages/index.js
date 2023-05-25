import { v4 as uuidv4 } from 'uuid';
import { MongoClient } from 'mongodb';
import nc from 'next-connect';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  const apiKey = req.query.apiKey;
  if (!session && apiKey !== process.env.API_KEY) {
    res.status(401).json([{input:"Please provide a valid API key or Log In."}]);  
    return;
  }

  const uri = process.env.MONGODB_MESSAGE_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  if (req.method === 'GET') {
    const timeout = parseInt(req.query.timeout) || 60000;
    try {
      await client.connect();
      const collection = client.db('Chatapp').collection('messages');
      const messages = await collection.find().sort({ timestamp: -1 }).limit(50).toArray();
      if (messages.length > 0) {
        res.status(200).json(messages);
      } else {
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        let timer = 0;
        while (timer < timeout) {
          await wait(1000);
          const newMessages = await collection.find().sort({ timestamp: -1 }).limit(50).toArray();
          if (newMessages.length > messages.length) {
            res.status(200).json(newMessages);
            return;
          }
          timer += 1000;
        }
        res.status(204).send();
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving messages.');
    } finally {
      await client.close();
    }
  } else if (req.method === 'POST') {
    const { input, userImage, userName } = req.body;
    const timestamp = new Date().toISOString();
    const id = uuidv4();
    const message = { id, input, userImage, userName, timestamp };
    try {
      await client.connect();
      const collection = client.db('Chatapp').collection('messages');
      const result = await collection.insertOne(message);
      console.log(`Inserted ${result.insertedCount ?? 0} document(s)`);
      res.status(201).send('Message sent successfully.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error sending message.');
    } finally {
      await client.close();
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
