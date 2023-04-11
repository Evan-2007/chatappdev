import { v4 as uuidv4 } from "uuid";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_MESSAGE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  if (req.headers.accept === "text/event-stream") {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    try {
      await client.connect();
      const collection = client.db("Chatapp").collection("messages");
      const cursor = collection
        .find()
        .sort({ timestamp: -1 })
        .limit(50)
        .addCursorFlag("tailable", true)
        .addCursorFlag("awaitData", true)
        .addCursorFlag("noCursorTimeout", true)
        .stream();

      cursor.on("data", (message) => {
        const data = {
          id: message.id,
          input: message.input,
          userImage: message.userImage,
          userName: message.userName,
          timestamp: message.timestamp,
        };
        const event = `data: ${JSON.stringify(data)}\n\n`;
        res.write(event);
      });

      cursor.on("error", (error) => {
        console.error(error);
        res.end();
      });

      cursor.on("end", () => {
        res.end();
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving messages.");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
