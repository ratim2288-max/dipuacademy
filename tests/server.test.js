/* eslint-env jest */
const request = require('supertest');
const app = require('../src/server');

describe('Server & API Basic Tests', () => {
  it('GET /api/health returns 200 and online status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('online');
  });

  it('GET /api/courses returns 200 and courses list', async () => {
    const res = await request(app).get('/api/courses');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });

  it('GET /api/site-stats returns 200', async () => {
    const res = await request(app).get('/api/site-stats');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });

  afterAll(async () => {
    const mongoose = require('mongoose');
    await mongoose.disconnect();
  });
});

