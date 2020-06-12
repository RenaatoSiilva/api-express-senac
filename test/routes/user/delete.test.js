const { expect } = require("chai");
const request = require("supertest");
const server = require("../../../server");
const UserModel = require("../../../models/user");

describe("Delete User Route", () => {
  context("when I execute a delete to /user/:id with valid id", () => {
    const data = {
      name: 'Renato Silva',
      email: 'renato_silva94@live.com',
      password: '123654789', 
      avatar: 'default.jpg', 
      roles: ['normal']
    };

    let id;

    before(async () => {
      const { insertedId } = await UserModel.insertOne(data);
      id = insertedId;
    });

    it("should return status 200", async () => {
      const response = await request(server).get(`/user/${id}`);
      expect(response.status).to.be.equals(200);
    });
  });
  context("when I execute a delete to /user/:id with invalid id", () => {
    let id;
    before(async () => {
      id = "5ee1e3b15c2b22362c428f65";
    });

    it("should return status 404", async () => {
      const response = await request(server).get(`/user/${id}`);
      expect(response.status).to.be.equals(404);
    });
  });
});
