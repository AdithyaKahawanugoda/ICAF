const app = require("../app.js");
const mongoose = require("mongoose");
const supertest = require("supertest");

//check get profile give Can not find the user when run that route without login
test("getProfile", async () => {
  const result = await supertest(app).get(
    "/grid/api/researcherpvt/getProfile"
  ).send({

  })
  expect(result.statusCode).toBe(422);
});

//trying to update research profile without sending resercher id
test("editProfile", async () => {
    const result = await supertest(app).put(
      "/grid/api/researcherpvt/editProfile"
    ).send({
        username:"Lakindu Kavishka",
        email:"lakindu@gmail.com",
        
    })
    expect(result.statusCode).toBe(500);
  });

//trying to update research profile picture without sending requierd details
  test("updatepp", async () => {
    const result = await supertest(app).put(
      "/grid/api/researcherpvt/updatepp"
    );
    expect(result.statusCode).toBe(500);
  });

  test("addresearchdata", async () => {
    const result = await supertest(app).put(
      "/grid/api/researcherpvt/addresearchdata"
    );
    expect(result.statusCode).toBe(500);
  });

//   test("updateresearchdata", async () => {
//     const result = await supertest(app).put(
//       "/grid/api/researcherpvt/updateresearchdata"
//     );
//     expect(result.statusCode).toBe(200);
//   });

