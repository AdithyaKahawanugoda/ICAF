const app = require("../app.js");
const mongoose = require("mongoose");
const supertest = require("supertest");

//getConference
test("getConference", async () => {
  const result = await supertest(app)
    .get("/grid/api/guest/getConference")
    .send({});
  expect(result.statusCode).toBe(200);
});

//getConference
test("getNotices", async () => {
  const result = await supertest(app)
    .get("/grid/api/guest/getNotices")
    .send({});
  expect(result.statusCode).toBe(200);
});

//getConference
test("getTimeline", async () => {
  const result = await supertest(app)
    .get("/grid/api/guest/getTimeline")
    .send({});
  expect(result.statusCode).toBe(200);
});

//getConference with wrong id
test("getResearch/:rID", async () => {
  const result = await supertest(app)
    .get("/grid/api/guest/getResearch/60b367f6f00de348c0abdc")
    .send({});
  expect(result.statusCode).toBe(500);
});

//getConference with wrong id
test("getWorkshop/:wID", async () => {
  const result = await supertest(app)
    .get("/grid/api/guest/getResearch/60b367f6f00de348c0abdc")
    .send({});
  expect(result.statusCode).toBe(500);
});
