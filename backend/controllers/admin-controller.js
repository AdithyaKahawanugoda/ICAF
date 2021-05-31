const ConferenceModel = require("../models/conference-model");
const AllUsersModel = require("../models/allusers-model");
const HomenoticeModal = require("../models/homenotice-model");
const UserGuideModel = require("../models/userguide-model");
const TimeLineModel = require("../models/newstimeline-model");
const NotificationModel = require("../models/notification-model");

//Fetch all users
exports.getUsersData = async (req, res) => {
  try {
    const allusers = await AllUsersModel.find();
    res.status(200).send({ allusers: allusers });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching users in admin controller -" + err,
    });
  }
};

//fetch home content that editor added
exports.getHomeContent = async (req, res) => {
  try {
    const homenotices = await HomenoticeModal.find({ status: "pending" });
    res.status(200).send({ homenotices: homenotices });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching home notices in admin controller -" + err,
    });
  }
};

//fetch user guide content that editor added
exports.getUserGuideContent = async (req, res) => {
  try {
    const userGuideData = await UserGuideModel.find({ status: "pending" });
    res.status(200).send({ userGuideData: userGuideData });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching user guide data in admin controller - " + err,
    });
  }
};

//fetch news time line content that editor added
exports.getNewsTimelines = async (req, res) => {
  try {
    const newsTimelineData = await TimeLineModel.find({ status: "pending" });
    res.status(200).send({ newsTimelineData: newsTimelineData });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc:
        "Error in fetching user news timeline data in admin controller - " +
        err,
    });
  }
};

//approve or reject news time line content
exports.manageNewsTimelines = async (req, res) => {
  const { status, nid } = req.body;
  try {
    const result = await manageEditorsContent(
      status,
      TimeLineModel,
      nid,
      req,
      res
    );
    if (result) {
      res.status(200).json({
        success: true,
        desc: "Timeline news status updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in manageNewsTimelines controller-" + error,
    });
  }
};

//approve or reject Home content
exports.manageHomeContent = async (req, res) => {
  const { status, nid } = req.body;
  try {
    const result = await manageEditorsContent(
      status,
      HomenoticeModal,
      nid,
      req,
      res
    );
    if (result) {
      res.status(200).json({
        success: true,
        desc: "HomenoticeModal  status updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in HomenoticeModal controller-" + error,
    });
  }
};

//approve or userguid content
exports.manageUserGuidContent = async (req, res) => {
  const { status, nid } = req.body;
  try {
    const result = await manageEditorsContent(
      status,
      UserGuideModel,
      nid,
      req,
      res
    );
    if (result) {
      res.status(200).json({
        success: true,
        desc: "UserGuideModel status updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in UserGuideModel controller-" + error,
    });
  }
};

//approve or reject conference content
exports.manageConfContent = async (req, res) => {
  const { status, nid } = req.body;
  try {
    const result = await manageEditorsContent(
      status,
      ConferenceModel,
      nid,
      req,
      res
    );
    if (result) {
      res.status(200).json({
        success: true,
        desc: "ConferenceModel news status updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in ConferenceModel controller-" + error,
    });
  }
};

//function to approve or ignore editors content
const manageEditorsContent = async (status, model, id, req, res) => {
  let subject;
  let desc;

  if (status === "approvebyadmin") {
    subject = "content Approved";
    desc = `Your content # ${id} has been approved by the admin`;
  } else {
    subject = "content Rejected";
    desc = `Sorry!Your content # ${id} has been rejected by the admin`;
  }

  const data = {
    fromId: req.body._id,
    subject: subject,
    desc: desc,
  };

  try {
    const updatedStatus = await model.updateOne(
      { _id: id },
      { status: status }
    );
    const notification = await sendNotification(data, res);
    if (updatedStatus && notification) {
      return updatedStatus;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error manageEditorsContent in admin controller - " + err,
    });
  }
};

const sendNotification = async (data, res) => {
  try {
    const newNotification = await NotificationModel.create({
      from: {
        userRole: "admin",
        userid: data.fromId,
      },
      to: {
        userRole: "editor",
      },
      subject: data.subject,
      description: data.desc,
    });
    return newNotification;
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in sendNotification in editor controller - " + error,
    });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find({
      "to.userRole": req.body.role,
    });
    res.status(500).json({
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getNotifications in notification controller - " + error,
    });
  }
};

exports.deleteTimelines = async (req, res) => {
  const { nid } = req.body;
  try {
    const result = await deleteContent(TimeLineModel, nid, req, res);
    if (result) {
      res.status(200).json({
        success: true,
        desc: "Timeline deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in manageNewsTimelines controller-" + error,
    });
  }
};

exports.deleteHomeContent = async (req, res) => {
  const { nid } = req.body;
  try {
    const result = await deleteContent(HomenoticeModal, nid, req, res);
    if (result) {
      res.status(200).json({
        success: true,
        desc: "deleteHomeContent deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in deleteHomeContent controller-" + error,
    });
  }
};

exports.deleteUserGuidContent = async (req, res) => {
  const { nid } = req.body;
  try {
    const result = await deleteContent(UserGuideModel, nid, req, res);
    if (result) {
      res.status(200).json({
        success: true,
        desc: "UserGuide deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in UserGuideModel controller-" + error,
    });
  }
};

exports.deleteConfContent = async (req, res) => {
  const { nid } = req.body;
  try {
    const result = await deleteContent(ConferenceModel, nid, req, res);
    if (result) {
      res.status(200).json({
        success: true,
        desc: "deleteConfContent deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in deleteConfContent controller-" + error,
    });
  }
};

const deleteContent = async (model, id, req, res) => {
  const data = {
    fromId: req.body._id,
    subject: `content # ${id} deleted`,
    desc: `content # ${id} deleted`,
  };

  try {
    const deleteStatus = await model.deleteOne({ _id: id });

    const notification = await sendNotification(data, res);
    if (deleteStatus && notification) {
      return deleteStatus;
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      desc: "Error deleteContent in admin controller - " + err,
    });
  }
};
