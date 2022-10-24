/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-arrow-callback */
// eslint-disable-next-line import/order
const app = require('../app');
const chai = require('chai');
chai.use(require('chai-http'));
const { expect } = require('chai');

const host = 'http://localhost';
const port = '3002';
const url = `${host}:${port}`;

it('Customer Login Test', () => {
  chai
    .request(url)
    .post('/customer/login')
    .send({ email: 'suri@mail.com', password: 'test' })
    .end(function (err, res) {
      expect(res).to.have.status(200);
    });
});

it('Restaurant Signup Test', () => {
  chai
    .request(url)
    .post('/restaurant/register')
    .send({
      name: 'Ajisen Ramen',
      email: 'ajisen@mail.com',
      password: 'test',
      location: 'San Francisco, CA 94103',
    })
    .end(function (err, res) {
      expect(res).to.have.status(200);
    });
});

it('Current Restaurant Profile Test', () => {
  chai
    .request(url)
    .get('/restaurant/profile')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY5NjNhODM2ZDVjZjIyYWIyZjNmOGU4IiwibmFtZSI6IkN1cnJ5IFVwIE5vdyIsImVtYWlsIjoiY3VAbWFpbC5jb20iLCJ1c2VydHlwZSI6InJlc3RhdXJhbnQifSwiaWF0IjoxNjA0NjkzMDQxLCJleHAiOjE2MDQ3MjkwNDF9.lbRfTSVOYDHGjxhtRgXXiZ_XE3H0m82WWU7Plirriaw',
    )
    .end(function (err, res) {
      expect(res).to.have.status(200);
    });
});

it('Get All Restaurants Test', () => {
  chai
    .request(url)
    .get('/restaurant/profile/all')
    .end(function (err, res) {
      expect(res).to.have.status(200);
    });
});

it('Get All Events Test', () => {
  chai
    .request(url)
    .get('/restaurant/events')
    .end(function (err, res) {
      expect(res).to.have.status(200);
    });
});
