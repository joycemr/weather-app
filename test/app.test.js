const app = require("../src/app");
const request = require('supertest');


test("GET /", async () => {
    await request(app)
        .get("/")
        .expect(200)
        .expect('Content-Type', /text/)
});