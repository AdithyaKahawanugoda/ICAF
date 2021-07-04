const ConferenceModel = require("../models/conference-model");
const AllUsersModel = require("../models/allusers-model");
const HomenoticeModal = require("../models/homenotice-model");
const UserGuideModel = require("../models/userguide-model");
const TimeLineModel = require("../models/newstimeline-model");
const NotificationModel = require("../models/notification-model");
const WorkshopModel = require("../models/workshopconductor-model");
const ResearchPapersModal = require("../models/researcher-model");
const GalleryModel = require("../models/gallery-model");
const { cloudinary } = require("../utils/cloudinary");




exports.getAllConferences = async (req, res) => {
  try {
    const conferences = await ConferenceModel.find();
    res.status(200).send({ conferences: conferences });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching Conference in admin controller -" + err,
    });
  }
};



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
exports.getWorkshopProposals = async (req, res) => {
  try {
    const workshopProposals = await WorkshopModel.find();

    res.status(200).send({ workshopProposals });
  } catch (err) {
    res.status(500).json({
      success: false,
      desc: "Error in getWorkshopProposals in admin controller -" + err,
    });
  }
};

exports.getResearchPapers = async (req, res) => {
  try {
    const researchPapers = await ResearchPapersModal.find();
    res.status(200).send({ researchPapers });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getResearchPapers in admin controller -" + error,
    });
  }
};

//fetch home content that editor added
exports.getHomeContent = async (req, res) => {
  try {
    const homenotices = await HomenoticeModal.find();
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
    const userGuideData = await UserGuideModel.find();
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
  let timelines = [];
  try {
    const newsTimelineData = await TimeLineModel.find();
    // const sortedTimeLine = newsTimelineData.position.sort()
    for (let i = 0; i < newsTimelineData.length; i++) {
      timelines.push(newsTimelineData[i]);
    }
    let temp = 0;
    for (let i = 0; i < timelines.length - 1; i++) {
      if (timelines[i].position > timelines[i + 1].position) {
        temp = timelines[i];

        timelines[i] = timelines[i + 1];
        timelines[i + 1] = temp;
      }
    }

    res.status(200).send({ newsTimelineData: timelines});
  } catch (err) {
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
        desc: "User Guide  status updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in User Guide controller-" + error,
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

//approve or reject Gallery content
exports.manageGalleryContent = async (req, res) => {
  const { status, nid } = req.body;
  try {
    const result = await manageEditorsContent(
      status,
      GalleryModel,
      nid,
      req,
      res
    );
    if (result) {
      res.status(200).json({
        success: true,
        desc: "Gallery Model new status updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in GalleryModel controller-" + error,
    });
  }
};

//function to approve or ignore editors content
const manageEditorsContent = async (status, model, id, req, res) => {
  let subject;
  let desc;

  if (status === "approvedbyadmin") {
    subject = "content Approved";
    desc = `Your content # ${id} has been approved by the admin`;
  } else {
    subject = "content Rejected";
    desc = `Sorry!Your content # ${id} has been rejected by the admin`;
  }

  const data = {
    fromId: req.user._id,
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
      "to.userRole": req.user.role,
      
    });
    res.status(200).json({
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getNotifications in notification controller - " + error,
    });
  }
};

exports.getSentNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find({
    
      "from.userRole": req.user.role,
    });
    res.status(200).json({
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
  const nid = req.params.id;
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
  const nid = req.params.id;
  console.log(nid);
  try {
    const result = await deleteContent(HomenoticeModal, nid, req, res);
    if (result) {
      res.status(200).json({
        success: true,
        desc: "HomeContent deleted",
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
  const nid = req.params.id;
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
  const nid = req.params.id;
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

exports.deleteGalleryContent = async (req, res) => {
  const nid = req.params.id;
  try {
    const result = await deleteContent(GalleryModel, nid, req, res);
    if (result) {
      res.status(200).json({
        success: true,
        desc: "Gallery Item deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in GalleryModel controller-" + error,
    });
  }
};

const deleteContent = async (model, id, req, res) => {
  console.log(id);
  const nId = id;
  const modelName = model;

  const data = {
    fromId: req.user._id,
    subject: `content # ${nId} deleted`,
    desc: `content # ${nId} deleted`,
  };

  try {
    const deleteStatus = await modelName.deleteOne({ _id: nId });

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

exports.addGaleryImage = async (req, res) => {
  const fileEnc = req.body.ppEnc;
  try {
    const uploadedResponse = await cloudinary.uploader.upload(fileEnc, {
      upload_preset: "Conference-Data",
    });

    const galleryImg = await GalleryModel.create({
      galleryImage: {
        imagePublicId: uploadedResponse.public_id,
        imageSecURL: uploadedResponse.secure_url,
      },
    });
    res.status(201).json({ success: true, galleryImg });
  } catch (err) {
    res.status(500).json({
      success: false,
      desc: "Error in Admin controller(addGaleryImage)-" + err,
    });
  }
};

exports.getGalleryImages = async (req, res) => {
  try {
    const gallery = await GalleryModel.find();
    res.status(200).send({ gallery });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching gallery in admin controller -" + err,
    });
  }
};


