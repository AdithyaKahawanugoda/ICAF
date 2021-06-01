const express = require("express");
const router = express.Router();

const {
  getWorkshopProposals,
  getResearchPapers,
  approveResearchPapers,
  approveWorkshops,
  getNotifications,
} = require("../controllers/reviewer-controller");

const { protectedReviewer } = require("../middlewares/route-authorization");

router
  .route("/getWorkshopProposals")
  .get(protectedReviewer, getWorkshopProposals);
router.route("/getResearchPapers").get(protectedReviewer, getResearchPapers);
router
  .route("/approveResearchPapers")
  .put(protectedReviewer, approveResearchPapers);
router.route("/approveWorkshops").put(protectedReviewer, approveWorkshops);

router.route("/getNotifications").get(protectedReviewer, getNotifications);

module.exports = router;
