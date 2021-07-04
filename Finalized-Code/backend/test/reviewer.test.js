const app = require("../app.js");
const mongoose = require("mongoose");
const supertest = require("supertest");

//getWorkshopProposals
test("getWorkshopProposals", async () => {
  const result = await supertest(app)
    .get("/grid/api/reviwerpvt/getWorkshopProposals")
    .send({});
  expect(result.statusCode).toBe(200);
});

//getResearchPapers
test("getResearchPapers", async () => {
  const result = await supertest(app)
    .get("/grid/api/reviwerpvt/getResearchPapers")
    .send({});
  expect(result.statusCode).toBe(200);
});



//approveResearchPapers with wrong id
test("approveResearchPapers", async () => {
  const result = await supertest(app)
    .put("/grid/api/reviwerpvt/approveResearchPapers")
    .send({
      newStatus: "Approve",
      fileID: "60b29711a7babe34f894b58",
    });
  expect(result.statusCode).toBe(500);
});

//approveWorkshops
test("approveWorkshops", async () => {
  const result = await supertest(app)
    .put("/grid/api/reviwerpvt/approveWorkshops")
    .send({
      newStatus: "Approve",
      fileID: "60b317aeb046d83b74848392",
    });
  expect(result.statusCode).toBe(200);
});

//getNotification without login
test("getNotification", async () => {
  const result = await supertest(app)
    .get("/grid/api/reviwerpvt/getNotifications")
    .send({});
  expect(result.body.desc).toBe("Error in getNotifications in notification controller - TypeError: Cannot read property 'role' of undefined");
});


