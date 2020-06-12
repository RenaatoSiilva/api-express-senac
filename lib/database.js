const { MongoClient } = require("mongodb");

class Database {
  async init() {
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017", {
      useUnifiedTopology: true,
    });
    this.db = client.db("news-api");
  }
}

module.exports = new Database();