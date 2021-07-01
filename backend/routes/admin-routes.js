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
  getWorkshopProposals,
  getResearchPapers,
  getSentNotifications,


  addGaleryImage,
  getGalleryImages,
  deleteGalleryContent,
  manageGalleryContent,
  getAllConferences,

  getNotifications,
} = require("../controllers/admin-controller");

const { protectedAdmin } = require("../middlewares/route-authorization");

router.route("/getUsersData").get(protectedAdmin,getUsersData);
router.route("/getWorkshopProposals").get(protectedAdmin,getWorkshopProposals);
router.route("/getResearchPapers").get(protectedAdmin,getResearchPapers);
router.route("/getUserGuideContent").get(protectedAdmin,getUserGuideContent);
router.route("/getHomeContent").get(protectedAdmin,getHomeContent);
router.route("/getNewsTimelines").get(protectedAdmin,getNewsTimelines);
router.route("/getAllConferences").get(protectedAdmin,getAllConferences);

router.route("/manageNewsTimelines").put(manageNewsTimelines);
router.route("/manageHomeContent").put(protectedAdmin,manageHomeContent);
router.route("/manageUserGuidContent").put(protectedAdmin,manageUserGuidContent);
router.route("/manageConfContent").put(protectedAdmin,manageConfContent);

router.route("/deleteConfContent/:id").delete(protectedAdmin,deleteConfContent);
router.route("/deleteHomeContent/:id").delete(protectedAdmin,deleteHomeContent);
router.route("/deleteTimelines/:id").delete(protectedAdmin,deleteTimelines);
router.route("/deleteUserGuidContent/:id").delete(protectedAdmin,deleteUserGuidContent);

router.route("/getNotification").get(protectedAdmin,getNotifications);
router.route("/getSentNotifications").get(protectedAdmin, getSentNotifications);

router.route("/addGaleryImage").post(addGaleryImage);
router.route("/getGalleryImages").get(protectedAdmin,getGalleryImages);
router.route("/deleteGalleryContent/:id").delete(protectedAdmin,deleteGalleryContent);
router.route("/manageGalleryContent").put(protectedAdmin,manageGalleryContent);


module.exports = router;
