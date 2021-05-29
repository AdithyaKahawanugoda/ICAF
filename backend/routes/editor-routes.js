const express = require("express");
const router = express.Router();
// import authentication
const { protectedEditor } = require("../middlewares/route-authorization");

// import controllers
const {
  getEditor,
  updateEditor,
  //   addPdfTemplates,
  //   addPptTemplates,
  addConference,
  updateConference,
  //   deleteConference,
  //   addHomenotice,
  //   updateHomenotice,
  //   deleteHomenotice,
  //   addTimelinedata,
  //   updateTimelinedata,
  //   deleteTimelinedata,
  //   addUserGuide,
  //   updateUserGuide,
  //   deleteUserGuide,
} = require("../controllers/editor-controller");

//Registration-routes
router.route("/getProfile").get(protectedEditor, getEditor);
router.route("/editProfile").put(protectedEditor, updateEditor);
router.route("/addConference").post(protectedEditor, addConference);
router.route("/editConference").put(protectedEditor, updateConference);

module.exports = router;
