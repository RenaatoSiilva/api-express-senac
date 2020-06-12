const { expect } = require("chai");
const request = require("supertest");
const server = require("../../../server");
const UserModel = require("../../../models/user");
const Database = require("../../utils/database");

describe("Put/:id User Route", () => {
  context("when I execute a put to /user/:id with valid id", () => {
    const data = {
      name: "Vitor Alano",
      email: "alano.vitor@gmail.com",
      password: "123789456",
      avatar: "aaa.jpg",
      roles: ["normal"],
    };

    const dataToUpdate = {
      name: "Renato Silva",
      email: "renato_silva94@live.com",
      password: "123654789",
      avatar: "default.jpg",
      roles: ["normal", "normal"],
    };

    let id;

    before(async () => {
      const { insertedId } = await UserModel.insertOne(data);
      id = insertedId;
    });

    it("should return an user data and status 200", async () => {
      const response = await request(server)
        .put(`/user/${id}`)
        .send(dataToUpdate)
        .set("Accept", "application/json");
      expect(response.status).to.be.equals(200);
      expect(response.body).to.have.property("_id");
      expect(response.body).to.have.property("name");
      expect(response.body.name).to.be.equal("Renato Silva");
      expect(response.body).to.have.property("password");
      expect(response.body.password).to.be.equal("123654789");
      expect(response.body).to.have.property("email");
      expect(response.body.email).to.be.equal("renato_silva94@live.com");
      expect(response.body).to.have.property("avatar");
      expect(response.body.avatar).to.be.equal("default.jpg");
      expect(response.body).to.have.property("roles");
      expect(response.body.roles).to.be.an("array");
    });
  });
  context("when I execute a put to /user/:id with invalid id", () => {
    let id;
    before(async () => {
      id = "5ff0a9b16b2b35462c428f65";
    });

    it("should return status 400 and error message", async () => {
      const response = await request(server).put(`/user/${id}`);
      expect(response.status).to.be.equals(400);
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("Validation Error");

    });
  });
  context("when I execute a put to /user/:id with inexisting id", () => {
    let id;

    const data = {
      name: "Vitor Alano",
      email: "alano.vitor@gmail.com",
      password: "12355789",
      avatar: "aaa.jpg",
      roles: ["normal"],
    };

    before(async () => {
      await Database.clear();
      id = "5ee1738c9aaa044270123604";
    });

    it("should return status 404", async () => {
      const response = await request(server)
        .put(`/user/${id}`)
        .send(data)
        .set("Accept", "application/json");
      expect(response.status).to.be.equals(404);
    });
  });
});
