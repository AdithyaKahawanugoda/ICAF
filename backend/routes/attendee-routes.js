const express = require("express");
const router = express.Router();

//import middleware
const { protectedAttendee } = require("../middlewares/route-authorization");


//import controllers
const {
    getAttendeeDetails,
    updateAttendeeDetails,
    deleteAttendeeDetails
} = require ("../controllers/attendee-controller");

//routes
router.route("/attendee").get(protectedAttendee,getAttendeeDetails);
router.route("/attendee/update").put(protectedAttendee,updateAttendeeDetails);
router.route("/attendee/delete").delete(protectedAttendee,deleteAttendeeDetails);



module.exports = router;

