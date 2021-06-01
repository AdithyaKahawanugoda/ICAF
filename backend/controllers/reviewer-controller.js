const WorkshopModel = require("../models/workshopconductor-model");
const ResearchPapersModal = require("../models/researcher-model");
const NotificationModel = require("../models/notification-model");
const ConferenceModel = require("../models/conference-model");
const getConference = require("./guest-controller");

// fetch workshopData arrays with at least 1 Pending status only
exports.getWorkshopProposals = async (req, res) => {
  try {
    const workshopProposals = await WorkshopModel.find(
      {
        workshopData: { $elemMatch: { status: "Pending" } },
      },
      { workshopData: 1 }
    );

    res.status(200).send({ workshopProposals });
  } catch (err) {
    res.status(500).json({
      success: false,
      desc: "Error in getWorkshopProposals in reviewer controller -" + err,
    });
  }
};

// fetch researchData arrays with at least 1 Pending status only
exports.getResearchPapers = async (req, res) => {
  try {
    const researchPapers = await ResearchPapersModal.find(
      {
        researchData: { $elemMatch: { status: "Pending" } },
      },
      { researchData: 1 }
    );
    res.status(200).send({ researchPapers });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getResearchPapers in reviewer controller -" + error,
    });
  }
};

exports.approveResearchPapers = async (req, res) => {
  const { newStatus, fileID, id } = req.body;
  let subject;
  let desc;

  if (newStatus === "approvebyreviewer") {
    subject = "Research Paper Approved";
    desc = "Your Research Paper has been approved by the reviewer";
  } else {
    subject = "Research Paper Rejected";
    desc = "Sorry!Your Research Paper has been rejected by the reviewer";
  }

  const data = {
    fromId: req.body._id,
    userid: id,
    toUserrole: "researcher",
    subject: subject,
    desc: desc,
  };

  try {
    const result = await ResearchPapersModal.updateOne(
      { "researchData._id": fileID },
      { $set: { "researchData.$.status": newStatus } },
      { new: true }
    );

    const notification = await sendNotification(data, res);
    if (result) {
      res.status(200).send({
        success: true,
        desc: "successfully updated ",
        result,
        notification,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in approveResearchPapers in reviewer controller -" + error,
    });
  }
};

exports.approveWorkshops = async (req, res) => {
  const { newStatus, fileID, id } = req.body;
  let addToConf;
  let conf;
  let subject;
  let desc;

  if (newStatus === "approvedbyreviewer") {
    subject = "Workshop Approved";
    desc = "Your Workshop proposel has been approved by the reviewer";
  } else {
    subject = "Workshop Rejected";
    desc = "Sorry!Your Workshop proposel has been rejected by the reviewer";
  }

  const data = {
    fromId: req.body._id,
    userid: req.body.id,
    subject: subject,
    desc: desc,
    toUserrole: "workshopcunduntor",
  };

  try {
    const result = await WorkshopModel.updateOne(
      { "workshopData._id": fileID },
      { $set: { "workshopData.$.status": newStatus } },
      { new: true }
    );

    if (newStatus === "approvedbyreviewer") {
      addToConf = addToConference(fileID, res);
      conf = (await addToConf).toString;
    }
    const notification = await sendNotification(data, res);
    if (result) {
      res.status(200).send({
        success: true,
        desc: `successfully updated and ${conf}`,
        result,
        notification,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in approveWorkshops in reviewer controller -" + error,
    });
  }
};

const addToConference = async (fileID, res) => {
  const workshopID = fileID;
  const conferenceID = "60b4643e2b18f90ba8289a29";

  const workshop = {
    workshopID,
  };

  try {
    await ConferenceModel.findOneAndUpdate(
      { _id: conferenceID },
      { $push: { addedWorkshops: workshop } }
    );
    return "added to conference";
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in adding workshop - " + error,
    });
  }
};

const sendNotification = async (data, res) => {
  try {
    const newNotification = await NotificationModel.create({
      from: {
        userRole: "reviewer",
        userid: data.fromId,
      },
      to: {
        userRole: data.toUserrole,
        userid: data.userid,
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
