require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//import routes
const authenticationRoute = require("./routes/authentication-routes");
const attendeeRoute = require("./routes/attendee-routes");
const workshopConductorRoute = require("./routes/workshopconductor-routes");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

mongoose
  .connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connection Success");
  })
  .catch((err) => {
    console.log("Connection Failed - " + err);
  });

//use routes
app.use("/grid/api/auth", authenticationRoute);
//adminpvt
//attendeepvt
app.use("/grid/api/attendeepvt",attendeeRoute);
//editorpvt
//guest
//researcherpvt
//reviewerpvt
//wconductorpvt
app.use("/grid/api/workshopconductorpvt",workshopConductorRoute);

//event loop for server
app.listen(PORT, () => {
  console.log(`Backend Server is running on port ${PORT}`);
});
