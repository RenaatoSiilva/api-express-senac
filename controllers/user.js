const User = require("../models/user");

class UserController {
  async list(req, res) {
    const { limit, skip, orderBy, order } = req.query;
    const sort = {};
    sort[orderBy] = order;
    const users = await User.find(limit, skip, sort);
    res.send(users);
  }

  async find(req, res) {
    const { id } = req.params;
    const user = await User.findOne(id);
    if (!user) {
      res.status(404);
    }
    res.send(user);
  }

  async create(req, res) {
    const { insertedId } = await User.insertOne(req.body);
    res.send({ insertedId });
  }

  async update(req, res) {
    const { id } = req.params;
    const { value } = await User.findOneAndUpdate(id, req.body);
    if (value) {
      res.send(value);
    } else {
      res.status(404).send();
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const user = await User.findOne(id);
    if (!user) {
      return res.status(404).send();
    }
    await User.deleteOne(id);
    res.send({});
  }
}

module.exports = new UserController();
