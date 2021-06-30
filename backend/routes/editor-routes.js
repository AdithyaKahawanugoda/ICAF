const express = require("express");
const router = express.Router();
// import authentication
const { protectedEditor } = require("../middlewares/route-authorization");

// import controllers
const {
  getEditor,
  updateEditor,
  addPdfTemplates,
  addPptTemplates,
  addConference,
  updateConference,
  addHomenotice,
  updateHomenotice,
  addTimelinedata,
  updateTimelinedata,
  addUserGuide,
  updateUserGuide,
  getNotifications,
  addSpeaker,
  editSpeaker,
  requestSpeakerRemove,
  requestGuideRemove,
  requestNewsRemove,
  requestNoticeRemove,
} = require("../controllers/editor-controller");

router.route("/getProfile").get(protectedEditor, getEditor);
router.route("/editProfile").patch(protectedEditor, updateEditor);

router.route("/addResearchTemplate").put(protectedEditor, addPdfTemplates);
router.route("/addWorkshopTemplate").put(protectedEditor, addPptTemplates);

router.route("/addConference").post(protectedEditor, addConference);
router.route("/editConference").patch(protectedEditor, updateConference);

router.route("/addSpeaker").put(protectedEditor, addSpeaker);
router.route("/editSpeaker").put(protectedEditor, editSpeaker);
router
  .route("/requestSpeakerRemove")
  .put(protectedEditor, requestSpeakerRemove);

router.route("/addNotice").post(protectedEditor, addHomenotice);
router.route("/editNotice").put(protectedEditor, updateHomenotice);
router.route("/requestNoticeRemove").put(protectedEditor, requestNoticeRemove);

router.route("/addNews").post(protectedEditor, addTimelinedata);
router.route("/editNews").put(protectedEditor, updateTimelinedata);
router.route("/requestNewsRemove").put(protectedEditor, requestNewsRemove);

router.route("/addGuide").post(protectedEditor, addUserGuide);
router.route("/editGuide").put(protectedEditor, updateUserGuide);
router.route("/requestGuideRemove").put(protectedEditor, requestGuideRemove);

router.route("/getNotifications").get(protectedEditor, getNotifications);

module.exports = router;
