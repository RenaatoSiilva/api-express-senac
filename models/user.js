const Collection = require("../lib/collection");
const { ObjectId } = require("mongodb");

class User extends Collection {
  constructor() {
    super("users");
  }

  find(limit, skip, sort) {
    return this.collection
      .find({})
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .toArray();
  }

  findOne(id) {
    return this.collection.findOne({ _id: ObjectId(id) });
  }

  insertOne(user) {
    return this.collection.insertOne(user);
  }

  findOneAndUpdate(id, body) {
    return this.collection.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: body },
      { returnOriginal: false }
    );
  }

  deleteOne(id) {
    return this.collection.deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = new User();
