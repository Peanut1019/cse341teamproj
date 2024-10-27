const app = require('../server');
const supertest = require('supertest');
const {expect} = require('@shelf/jest-mongodb');
const request = supertest(app);

describe('Test Handlers', () => {
    test('responds to /', async () => {
        const res =await request.get('/');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });
    test('responds to /pharmacy', async () => {
        const res =await request.get('/pharmacy');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });
    test('responds to /users', async () => {
        const res =await request.get('/users');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });
    
})