const express = require("express");
const router = express.Router();

const {
  getUsersData,
  getHomeContent,
  getUserGuideContent,
  getNewsTimelines,
  manageNewsTimelines,
  manageHomeContent,
  manageUserGuidContent,
  manageConfContent,
  deleteUserGuidContent,
  deleteConfContent,
  deleteHomeContent,
  deleteTimelines,

  getNotifications,
} = require("../controllers/admin-controller");

const { protectedAdmin } = require("../middlewares/route-authorization");

router.route("/getUsersData").get(protectedAdmin, getUsersData);
router.route("/getUserGuideContent").get(protectedAdmin, getUserGuideContent);
router.route("/getHomeContent").get(protectedAdmin, getHomeContent);
router.route("/getNewsTimelines").get(protectedAdmin, getNewsTimelines);

router.route("/manageNewsTimelines").put(protectedAdmin, manageNewsTimelines);
router.route("/manageHomeContent").put(protectedAdmin, manageHomeContent);
router
  .route("/manageUserGuidContent")
  .put(protectedAdmin, manageUserGuidContent);
router.route("/manageConfContent").put(protectedAdmin, manageConfContent);

router.route("/deleteConfContent").delete(protectedAdmin, deleteConfContent);
router.route("/deleteHomeContent").delete(protectedAdmin, deleteHomeContent);
router.route("/deleteTimelines").delete(protectedAdmin, deleteTimelines);
router
  .route("/deleteUserGuidContent")
  .delete(protectedAdmin, deleteUserGuidContent);

router.route("/getNotification").get(gprotectedAdmin, etNotifications);

module.exports = router;
