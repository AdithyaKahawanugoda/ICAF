const app = require("../app.js");
const mongoose = require("mongoose");
const supertest = require("supertest");

//check loging with  credentials
test("login1", async () => {
  const result = await supertest(app).post(
    "/grid/api/auth/login"
  ).send({
    email:"lakindulk9@gmail.com",
    password:"lakindu1",
    role:"researcher"
  })
  expect(result.statusCode).toBe(200);
});
//check loging with wrong credentials
test("login2", async () => {
    const result = await supertest(app).post(
      "/grid/api/auth/login"
    ).send({
      email:"lakindulk9@gmail.com",
      password:"lakindu123",
      role:"researcher"
    })
    expect(result.statusCode).toBe(401);
  });
  //register as admin
  test("reg-admin", async () => {
    const result = await supertest(app).post(
      "/grid/api/auth/reg-admin"
    ).send({
        email:"admin358@gmail.com", 
        password:"admin2@123"
    })
    expect(result.statusCode).toBe(500);
  });
 //register with used email account as admin
  test("reg-admin", async () => {
    const result = await supertest(app).post(
      "/grid/api/auth/reg-admin"
    ).send({
        email:"admin2@gmail.com", 
        password:"admin2@123"
    })
    expect(result.statusCode).toBe(500);
  });
//register with used email account as editor
  test("reg-editor", async () => {
    const result = await supertest(app).post(
      "/grid/api/auth/reg-editor"
    ).send({
        email:"editor123@gmail.com", 
        password:"editor2@123"
    })
    expect(result.statusCode).toBe(500);
  });

  

//  // register  as reviewer
//   test("reg-reviewer", async () => {
//     const result = await supertest(app).post(
//       "/grid/api/auth/reg-reviewer"
//     ).send({
//         username:"reviwer234",
//         email:"rereviwer234@gmail.com", 
//         password:"reviwer234@123"
//     })
//     expect(result.statusCode).toBe(201);
//   });

  //register with used email account as reviewer
  test("reg-reviewer", async () => {
    const result = await supertest(app).post(
      "/grid/api/auth/reg-reviewer"
    ).send({
        username:"reviwer234",
        email:"rereviwer234@gmail.com", 
        password:"reviwer234@123"
    })
    expect(result.statusCode).toBe(500);
  });
  
//register as researcher without providing relevent details
  test("reg-researcher", async () => {
    const result = await supertest(app).post(
      "/grid/api/auth/reg-researcher"
    ).send({
        
    })
    expect(result.statusCode).toBe(500);
  });

  //register as researcher without payments
  test("reg-attendee", async () => {
    const result = await supertest(app).post(
      "/grid/api/auth/reg-attendee"
    ).send({
        username:"attendee567",
        email:"attendee567@gmail.com",
        password:"attendee567",
        profileImage: {
          imagePublicId: "Attendee-profile-pictures/s6qklyslfh3ogcb9jcpc",
          imageSecURL: "https://res.cloudinary.com/grid1234/image/upload/v1622265472/Attendee-...",
        },
        purchasedTickets: [{ ticketID:"60b0f8afd768bbe95d5092b6" }],
    })
    expect(result.statusCode).toBe(500);
  });

  
    //register as workshopconductor without workshop proposal
    test("reg-workshopconductor", async () => {
        const result = await supertest(app).post(
          "/grid/api/auth/reg-workshopconductor"
        ).send({
      
            username:"attendee567",
            email:"attendee567@gmail.com",
            password:"attendee567",
            topic:"Application Frameworks",
            ppEnc:"https://res.cloudinary.com/grid1234/image/upload/v1622265472/Attendee-...",
            
        })
        expect(result.statusCode).toBe(500);
      });