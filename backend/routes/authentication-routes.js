const express = require("express");
const router = express.Router();

// import controllers
const {
  registerAttendee,
  registerResearcher,
  registerAdmin,
  registerReviewer,
  registerEditor,
  registerWorkshopConductor,
  login,
} = require("../controllers/authentication-controller");

// Registration-routes
router.route("/reg-attendee").post(registerAttendee);
router.route("/reg-researcher").post(registerResearcher);
router.route("/reg-admin").post(registerAdmin);
router.route("/reg-reviewer").post(registerReviewer);
router.route("/reg-editor").post(registerEditor);
router.route("/reg-workshopconductor").post(registerWorkshopConductor);

// Login-routes
router.route("/login").post(login);

module.exports = router;
