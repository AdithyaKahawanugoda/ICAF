const express = require("express");
const router = express.Router();

// import controllers
const {
  getConference,
  getNotices,
  getTimeline,
  getResearch,
  getWorkshop,
  getGalleryImages,
  getGuideData,
} = require("../controllers/guest-controller");

// use routes
router.route("/getConference").get(getConference);
router.route("/getNotices").get(getNotices);
router.route("/getTimeline").get(getTimeline);
router.route("/getResearch/:rID").get(getResearch);
router.route("/getWorkshop/:wID").get(getWorkshop);
router.route("/getGalleryImages").get(getGalleryImages);
router.route("/getGuideData").get(getGuideData);

module.exports = router;
