const app = require("../app.js");
const mongoose = require("mongoose");
const supertest = require("supertest");

//get attednee profile attendee without requiered data
test("attendee", async () => {
  const result = await supertest(app)
    .get("/grid/api/attendeepvt/attendee")
    .send({});
  expect(result.statusCode).toBe(422);
});
// //update attednee profile attendee without requiered data
// test("/attendee/update", async () => {
//   const result = await supertest(app)
//     .put("/grid/api/attendeepvt/attendee/update")
//     .send({});
//   expect(result.statusCode).toBe(500);
// });
//delete attednee profile attendee without requiered data
test("attendee/delete", async () => {
  const result = await supertest(app)
    .delete("/grid/api/attendeepvt/attendee/delete")
    .send({});
  expect(result.statusCode).toBe(404);
});
