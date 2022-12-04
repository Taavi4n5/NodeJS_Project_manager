import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import app from '../src/app';

const admin = {
    email: "mari@maasikas.ee",
    password: "mari"
};

const wrongUser = {
    email: "who@this.what",
    password: "itswronganyway"
};

/*describe('Login test', () => {
  describe('GET /api/v1/login', () => {
    it('responds with error message and statuscode 404', async () => {
      const response = await request(app).post('/api/v1/login').send(wrongUser);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(404);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal("User not found");
    });
    it('responds with token and statuscode 200', async () => {
        const response = await request(app).post('/api/v1/login').send(admin);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
        expect(response.body.success).to.be.true;
        expect(response.body.message).to.a('string');
      });
  });
}); */

describe('Login authorization test', () => {
    describe('GET /api/v1/users', () => {
      it('responds with error message and statuscode 404', async () => {
        const response = await request(app).get('/api/v1/users');
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        expect(response.body.success).to.be.false;
        expect(response.body.message).to.equal("Token not found");
      });
      it('responds with userlist and statuscode 200', async () => {
        const login = await request(app).post('/api/v1/login').send(admin);
        const token = login.body.token;
        const response = await request(app).get('/api/v1/user').set('Authorization', `Bearer ${token}` );
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
        expect(response.body.success).to.be.true;
        expect(response.body.users).to.a('array');
        expect(response.body.users.length).to.be.gt(1);
      });
    });
});