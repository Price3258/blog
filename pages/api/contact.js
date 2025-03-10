import { MongoClient } from "mongodb";

import {
  MONGODB_CLUSTER,
  MONGODB_DB_NAME,
  MONGODB_ID,
  MONGODB_PASSWORD,
} from "@/lib/constant";

const MONGO_DB_URL = `mongodb+srv://${MONGODB_ID}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.k3x69.mongodb.net/${MONGODB_DB_NAME}?retryWrites=true&w=majority&appName=${MONGODB_CLUSTER}`;

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }
    const newMessage = {
      email,
      name,
      message,
    };

    let client;
    try {
      client = await MongoClient.connect(MONGO_DB_URL);
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing message failed!" });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing message failed!" });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: "Successfully stored message!", message: newMessage });
  }
}

export default handler;
