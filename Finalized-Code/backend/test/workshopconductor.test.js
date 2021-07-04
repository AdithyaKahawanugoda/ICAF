const app = require("../app.js");
const mongoose = require("mongoose");
const supertest = require("supertest");

//Fetching workshop conductors profile without sending requierd data
// test("workshopconductor", async () => {
//   const result = await supertest(app)
//     .get("/grid/api/wconductorpvt/workshopconductor/")
//     .send({});
//   expect(result.statusCode).toBe(422);
// });
//Updating workshop conductor's profile Deatails sending requierd data
test("workshopconductor/update", async () => {
  const result = await supertest(app)
    .put("/grid/api/wconductorpvt/workshopconductor/update")
    .send({});
  expect(result.statusCode).toBe(500);
});
//Update workshop profile photo sending requierd data
test("workshopconductor/updatepp", async () => {
  const result = await supertest(app)
    .put("/grid/api/wconductorpvt/workshopconductor/updatepp")
    .send({});
  expect(result.statusCode).toBe(500);
});
// //Adding workshop proposal sending requierd data
// test("workshopconductor/proposal/add", async () => {
//   const result = await supertest(app)
//     .put("/grid/api/wconductorpvt/workshopconductor/proposal/add")
//     .send({});
//   expect(result.statusCode).toBe(500);
// });

//updating workshop proposal sending requierd data
test("workshopconductor/proposal/update", async () => {
  const result = await supertest(app)
    .put("/grid/api/wconductorpvt/workshopconductor/proposal/update")
    .send({workshopTopic:"Usage Of Jest",
        workshopDescription:"test desciption from Usage Of Jest",
        workshopPropId:"60b31fe709cf4123e86a836c"});
  expect(result.statusCode).toBe(200);
});


