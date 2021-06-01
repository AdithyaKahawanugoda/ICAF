const express = require("express");
const router = express.Router();

// import controllers
const {
  updateNotification,
  deleteNotification,
} = require("../controllers/notification-controller");

//Registration-routes
router.route("/editNotification").put(updateNotification);
router.route("/deleteNotification").delete(deleteNotification);

module.exports = router;
