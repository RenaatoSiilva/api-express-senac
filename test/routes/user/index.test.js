const { expect } = require("chai");
const request = require("supertest");
const server = require("../../../server");
const UserModel = require("../../../models/user");
const Database = require("../../utils/database");

describe("Get/:id User Route", () => {
  context("when I execute a get to /user/:id with valid id", () => {
    const data = {
      name: "Vitor Alano",
      email: "alano.vitor@gmail.com",
      password: "12355789",
      avatar: "aaa.jpg",
      roles: ["normal"],
    };

    let id;

    before(async () => {
      const { insertedId } = await UserModel.insertOne(data);
      id = insertedId;
    });

    it("should return an user data and status 200", async () => {
      const response = await request(server).get(`/user/${id}`);
      expect(response.status).to.be.equals(200);
      expect(response.body).to.have.property("_id");
      expect(response.body).to.have.property("name");
      expect(response.body).to.have.property("password");
      expect(response.body).to.have.property("email");
      expect(response.body).to.have.property("avatar");
      expect(response.body).to.have.property("roles");
    });
  });
  context("when I execute a get to /user/:id with invalid id", () => {
    let id;
    before(async () => {
      id = "5ee1e3b15c2b22362c228f68";
    });

    it("should return status 400 and error message", async () => {
      const response = await request(server).get(`/user/${id}`);
      expect(response.status).to.be.equals(400);
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("Validation Error");
    });
  });
  context("when I execute a get to /user/:id with inexisting id", () => {
    let id;
    before(async () => {
      id = "5ee1e3b15c2b22362c228f68";
    });

    it("should return status 404", async () => {
      const response = await request(server).get(`/user/${id}`);
      expect(response.status).to.be.equals(404);
    });
  });
});
