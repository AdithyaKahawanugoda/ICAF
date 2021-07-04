const app = require("../app.js");
const mongoose = require("mongoose");
const supertest = require("supertest");

//getUsersData
test("getUsersData", async () => {
  const result = await supertest(app)
    .get("/grid/api/adminpvt/getUsersData")
    .send({});
  expect(result.statusCode).toBe(200);
});

//getUserGuideContent
test("getUserGuideContent", async () => {
  const result = await supertest(app)
    .get("/grid/api/adminpvt/getUserGuideContent")
    .send({});
  expect(result.statusCode).toBe(200);
});

//getHomeContent
test("getHomeContent", async () => {
  const result = await supertest(app)
    .get("/grid/api/adminpvt/getHomeContent")
    .send({});
  expect(result.statusCode).toBe(200);
});

//getNewsTimelines
test("getNewsTimelines", async () => {
  const result = await supertest(app)
    .get("/grid/api/adminpvt/getNewsTimelines")
    .send({});
  expect(result.statusCode).toBe(200);
});

//getUsersData
test("getUsersData", async () => {
  const result = await supertest(app)
    .get("/grid/api/adminpvt/getUsersData")
    .send({});
  expect(result.statusCode).toBe(200);
});

//manageNewsTimelines
test("manageNewsTimelines", async () => {
  const result = await supertest(app)
    .put("/grid/api/adminpvt/manageNewsTimelines")
    .send({
      status: "rejected",
      nid: "60b0f4d1fcbdae06e059ab90",
    });
  expect(result.statusCode).toBe(200);
});

//manageHomeContent
test("manageHomeContent", async () => {
  const result = await supertest(app)
    .put("/grid/api/adminpvt/manageHomeContent")
    .send({
      status: "rejected",
      nid: "60b0f4d1fcbdae06e059ab85",
    });
  expect(result.body.desc).toBe("HomenoticeModal  status updated");
});

//manageUserGuidContent with wrong id
test("manageUserGuidContent", async () => {
  const result = await supertest(app)
    .put("/grid/api/adminpvt/manageUserGuidContent")
    .send({ status: "rejected", nid: "60b0f4d1fcbdae06e059ay76" });
  expect(result.statusCode).toBe(500);
});

//manageConfContent with wrong id
test("manageConfContent", async () => {
  const result = await supertest(app)
    .put("/grid/api/adminpvt/manageConfContent")
    .send({ status: "rejected", nid: "60b0f4d1fcbdae06e059ab" });
  expect(result.body.desc).toBe("Error in ConferenceModel controller-ReferenceError: err is not defined");
});

//deleteConfContent
test("deleteConfContent", async () => {
  const result = await supertest(app)
    .delete("/grid/api/adminpvt/deleteConfContent")
    .send({
      id: "60b0f4d1fcbdae06e059ab83",
    });
  expect(result.statusCode).toBe(200);
});

//deleteHomeContent
test("deleteHomeContent", async () => {
  const result = await supertest(app)
    .delete("/grid/api/adminpvt/deleteHomeContent")
    .send({
      id: "60b0f4d1fcbyhu06e059ab63",
    });
  expect(result.statusCode).toBe(200);
});

//deleteTimelines
test("deleteTimelines", async () => {
  const result = await supertest(app)
    .delete("/grid/api/adminpvt/deleteTimelines")
    .send({
      id: "60b0f4d1fcbdae06e059ab58",
    });
  expect(result.statusCode).toBe(200);
});

//deleteUserGuidContent
test("deleteUserGuidContent", async () => {
  const result = await supertest(app)
    .delete("/grid/api/adminpvt/deleteUserGuidContent")
    .send({
      id: "60b0f4d1fcbdae06e059ab63",
    });
  expect(result.body.desc).toBe("UserGuide deleted");
});

//fetch notifications without sending requiered data
test("getNotification", async () => {
  const result = await supertest(app)
    .get("/grid/api/adminpvt/getNotification")
    .send({});
  expect(result.statusCode).toBe(500);
});
