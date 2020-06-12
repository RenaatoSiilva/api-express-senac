const { expect } = require('chai');
const request = require('supertest');
const server = require('../../../server');

describe('Create User Route', () => {
  context('when I execute a POST to /user with valid body', () => {
    const data = {
      name: 'Renato Silva',
      email: 'renato_silva94@live.com',
      password: '123654789', 
      avatar: 'default.jpg', 
      roles: ['normal']
    };

    it('should return new user id and status 200', async () => {
      const response = await request(server).post('/user').send(data).set('Accept', 'application/json');
      expect(response.status).to.be.equals(200);
      expect(response.body).to.have.property('insertedId');
      expect(response.body.insertedId).to.be.a('string');
    });
  });

  context('when I execute a POST to /user with invalid name', () => {
    const data = {
      name: 'vi',
      email: 'vitor@live.com',
      password: '123654789', 
      avatar: 'default.jpg', 
      roles: ['normal']
    };

    it('should return a message and status 400', async () => {
      const response = await request(server).post('/user').send(data).set('Accept', 'application/json');
      expect(response.status).to.be.equals(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.a('string');
    });
  });

  context('when I execute a POST to /user with invalid roles', () => {
    const data = {
      name: 'Renato Silva',
      email: 'renato_silva94@live.com',
      password: '123654789', 
      avatar: 'default.jpg', 
      roles: ['anormaluser']
    };

    it('should return a message and status 400', async () => {
      const response = await request(server).post('/user').send(data).set('Accept', 'application/json');
      expect(response.status).to.be.equals(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.a('string');
    });
  });
});