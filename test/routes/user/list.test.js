const { expect } = require("chai");
const request = require("supertest");
const server = require("../../../server");

describe("Get User Route", () => {
  context("when I execute a get to /user", () => {
    it("should return an array and status 200", async () => {
      const response = await request(server).get("/user");
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an("array");
    });
  });
});
