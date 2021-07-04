const express = require("express");
const router = express.Router();

//import protected-routes middlewares
const { protectedResearcher } = require("../middlewares/route-authorization");

//import controllers
const {
  getResearcherDetails,
  updateResearcherDetails,
  deleteResearcherDetails,
  updateProfilePicture,
  addresearchData,
  removeresearchData,
  updateresearchdata,
  getNotifications,
  getAllResearchPapers,
  managePayment
} = require("../controllers/researcher-controller");

//Registration-routes
router.route("/getProfile").get(protectedResearcher, getResearcherDetails);
router.route("/editProfile").put(protectedResearcher, updateResearcherDetails);
router
  .route("/deleteprofile")
  .delete(protectedResearcher,deleteResearcherDetails);
router.route("/updatepp").put(protectedResearcher, updateProfilePicture);
router.route("/addresearchdata").put(protectedResearcher, addresearchData);
router
  .route("/updateresearchdata")
  .put(protectedResearcher, updateresearchdata);
router
  .route("/removeresearchdata")
  .put(protectedResearcher, removeresearchData);

  router.route("/notifyresearchdata").get(protectedResearcher, getNotifications);  
  router.route("/managePayment").put(protectedResearcher, managePayment);
  router.route("/researchPapers").get(getAllResearchPapers);
module.exports = router;
