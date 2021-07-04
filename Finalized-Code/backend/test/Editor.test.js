const app = require("../app.js");
const mongoose = require("mongoose");
const supertest = require("supertest");


//getProfile
test("getProfile", async () => {
  const result = await supertest(app)
    .get("/grid/api/editorpvt/getProfile")
    .send({});
  expect(result.body.desc).toBe("Can not find the user - Please check again");
});
//editProfile
test("editProfile", async () => {
  const result = await supertest(app)
    .put("/grid/api/editorpvt/editProfile")
    .send({});
  expect(result.body.desc).toBe("Error in updateEditor controller-TypeError: Cannot read property 'id' of undefined");
});
//addResearchTemplate without requierd fields
test("addResearchTemplate", async () => {
  const result = await supertest(app)
    .put("/grid/api/editorpvt/addResearchTemplate")
    .send({});
  expect(result.statusCode).toBe(500);
});
//addWorkshopTemplate without requierd fields
test("addWorkshopTemplate", async () => {
  const result = await supertest(app)
    .put("/grid/api/editorpvt/addWorkshopTemplate")
    .send({});
  expect(result.statusCode).toBe(500);
});
//addConference without requierd fields
test("addConference", async () => {
  const result = await supertest(app)
    .post("/grid/api/editorpvt/addConference")
    .send({});
  expect(result.statusCode).toBe(500);
});

//editProfile without requierd fields
test("editProfile", async () => {
  const result = await supertest(app)
    .put("/grid/api/editorpvt/editProfile")
    .send({});
  expect(result.statusCode).toBe(500);
});
//editConference
test("editConference", async () => {
  const result = await supertest(app)
    .put("/grid/api/editorpvt/editConference")
    .send({
      ntID: "60b38d89f7b1bc274085c7a5op",
      title: "tets",
      period: "5-9",
      startingTime: "5",
      about: "tets",
      venue: "main hall",
      status: "pending",
    });
  expect(result.body.desc).toBe("conference data updated successfully");
});

//addNotice without requierd fields
test("addNotice", async () => {
  const result = await supertest(app)
    .post("/grid/api/editorpvt/addNotice")
    .send({});
  expect(result.statusCode).toBe(500);
});
//editNotice
test("editNotice", async () => {
  const result = await supertest(app)
    .put("/grid/api/editorpvt/editNotice")
    .send({
      ntID: "60b38d86f7b1bc274034c7a5",
      title: "tets",
      description: "tets",
      status: "pending",
    });
  expect(result.statusCode).toBe(200);
});

//addNews without requierd fields
test("addNews", async () => {
  const result = await supertest(app)
    .post("/grid/api/editorpvt/addNews")
    .send({});
  expect(result.statusCode).toBe(500);
});
//editNews
test("editNews", async () => {
  const result = await supertest(app).put("/grid/api/editorpvt/editNews").send({
    ntID: "60b38d89f7b1bc274034c7a5",
    title: "tets",
    description: "tets",
    status: "pending",
  });
  expect(result.statusCode).toBe(200);
});
//addGuide without requierd fields
test("addGuide", async () => {
  const result = await supertest(app)
    .post("/grid/api/editorpvt/addGuide")
    .send({});
  expect(result.statusCode).toBe(500);
});
//editGuide
test("editGuide", async () => {
  const result = await supertest(app)
    .put("/grid/api/editorpvt/editGuide")
    .send({
      ugID: "60b38d89f7b1bc274034c7a2",
      sectionTitle: "contact info",
      articleTitle: "contact info",
      description: "test test test",
      status: "pending",
    });
  expect(result.statusCode).toBe(200);
});

// //requestGuideRemove
// test("requestGuideRemove", async () => {
//   const result = await supertest(app)
//     .put("/grid/api/editorpvt/requestGuideRemove")
//     .send({
//       gID:"60b38d89f7b1bc274034c7a8"
//     });
//   expect(result.statusCode).toBe(200);
// });

// //requestNewsRemove
// test("requestNewsRemove", async () => {
//   const result = await supertest(app)
//     .put("/grid/api/editorpvt/requestNewsRemove")
//     .send({
//       gID:"60b38d89f7b1bc274034c7c5"
//     });
//   expect(result.statusCode).toBe(200);
// });

// //requestNoticeRemove
// test("requestNoticeRemove", async () => {
//   const result = await supertest(app)
//     .put("/grid/api/editorpvt/requestNoticeRemove")
//     .send({
//       gID:"60b38d89f7b1bc274034y7r4"
//     });
//   expect(result.statusCode).toBe(200);
// });