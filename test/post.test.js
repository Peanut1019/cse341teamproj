const app = require('../server');
const supertest = require('supertest');
const {expect} = require('@shelf/jest-mongodb');
const request = supertest(app);

describe('Test Handlers', () => {
    test('responds to post /pharmacy', async () =>{
        const res = await request.post('/pharmacy').send( {
        id: "67119a9f4ca665efc45767cd",
        medication_name: "Insulin Glargine",
        dosage: "100 units/mL, 2 injectors",
        form: "Injection",
        prescription_required: "Yes" 
        });
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201);
    });
    test('responds to post /users', async () =>{
        const res = await request.post('/users').send( {
            id: "671198d24ca665efc45767bf",
            first_name: "Legolas",
            last_name: "Greenleaf",
            username: "elven_archer1",
            email: "legolas@mirkwood.com",
            role: "User",
            status: "active" 
        });
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201);
    });
});