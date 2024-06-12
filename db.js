import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://msolmoreno17:msolmoreno17@cluster0.txev5ot.mongodb.net/";

const client = new MongoClient(connectionString);

let conn;
try {

  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("austral");

export default db;
