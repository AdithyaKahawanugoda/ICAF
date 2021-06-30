const WorkshopModel = require("../models/workshopconductor-model");
const ResearchPapersModal = require("../models/researcher-model");
const NotificationModel = require("../models/notification-model");
const ConferenceModel = require("../models/conference-model");
const ReviewerModel = require("../models/reviewer-model");

exports.getReviewer = async (req, res) => {
  const id = "60b45ec3073b683f48405b2e";

  try {
    // if (!req.user) {
    //   res.status(422).json({
    //     success: false,
    //     desc: "Can not find the user - Please check again",
    //   });
    // } else {
    //   res.status(200).send({
    //     reviewer: req.user,
    //   });
    // }
    const reviewer = await ReviewerModel.findOne({ _id: id });
    res.status(200).send({
      reviewer: reviewer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getReviewer controller-" + error,
    });
  }
};

exports.updateReviewer = async (req, res) => {
  const { email, username } = req.body;
  try {
    const updateReviewer = await ReviewerModel.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          username,
          email,
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );
    res.status(200).send({
      success: true,
      desc: "user updated successfully",
      updateReviewer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in updateReviewer controller-" + error,
    });
  }
};

// fetch workshopData arrays with at least 1 Pending status only
// exports.getWorkshopProposals = async (req, res) => {
//   try {
//     const workshopProposals = await WorkshopModel.find(
//       {
//         workshopData: { $elemMatch: { status: "pending" } },
//       },
//       { workshopData: 1 }
//     );

//     res.status(200).send({ workshopProposals });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       desc: "Error in getWorkshopProposals in reviewer controller -" + err,
//     });
//   }
// };

exports.getWorkshopProposals = async (req, res) => {
  try {
    const workshopProposals = await WorkshopModel.find();

    res.status(200).send({ workshopProposals: workshopProposals });
  } catch (err) {
    res.status(500).json({
      success: false,
      desc: "Error in getWorkshopProposals in reviewer controller -" + err,
    });
  }
};

// fetch researchData arrays with at least 1 Pending status only
// exports.getResearchPapers = async (req, res) => {
//   try {
//     const researchPapers = await ResearchPapersModal.find(
//       {
//         researchData: { $elemMatch: { status: "pending" } },
//       },
//       { researchData: 1 }
//     );
//     res.status(200).send({ researchPapers });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       desc: "Error in getResearchPapers in reviewer controller -" + error,
//     });
//   }
// };

exports.getResearchPapers = async (req, res) => {
  try {
    const researchPapers = await ResearchPapersModal.find();
    res.status(200).send({ researchPapers: researchPapers });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getResearchPapers in reviewer controller -" + error,
    });
  }
};

//approve research papers
exports.approveResearchPapers = async (req, res) => {
  const { newStatus, fileID, userid} = req.body;
  let subject;
  let desc;

  if (newStatus === "approvedbyreviewer") {
    
    subject = "Research Paper Approved";
    desc = `Your Research Paper # ${fileID} has been approved by the reviewer`;
  } else if(newStatus === "rejectedbyreviewer") {
    subject = "Research Paper Rejected";
    desc = `Sorry!Your Research Paper # ${fileID} has been rejected by the reviewer`;
  }

  const data = {
    fromId: req.user._id,
    userid: userid,
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
    model = "reaserch";
    if (newStatus === "approvedbyreviewer") {
      checkPaperPayementStatus(fileID, res, model, userid)
    } else if (newStatus === "rejectedbyreviewer") {
      getConferenceId(fileID, res, model, "toRemove");
    }

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


const checkPaperPayementStatus = async (paperID, res, model, userid) => {
  try {
    const researcher = await ResearchPapersModal.findById(userid);
    
    for(let i = 0 ; i< researcher.researchData.length; i++){  
    
      if(researcher.researchData[i]._id == paperID ){  
        if(researcher.researchData[i].payment === "payementsuccessfull" ){
          getConferenceId(paperID, res, model,"toAdd");
        }
      }
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching conference id -" + error,
    });
  }
};

exports.approveWorkshops = async (req, res) => {
  const { newStatus, fileID,userid } = req.body;

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
    fromId: req.user._id,
    userid: userid,
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
     
    model = "workshop";
    if (newStatus === "approvedbyreviewer") {
      getConferenceId(fileID, res, model,"toAdd");
    } else if (newStatus === "rejectedbyreviewer") {
      getConferenceId(fileID, res, model, "toRemove");
     
    }
    const notification = await sendNotification(data, res);
    if (result) {
      res.status(200).send({
        success: true,
        desc: `successfully updated`,
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

const getConferenceId = async (fileID, res, model, to) => {
  try {
   
    const latestConference = await ConferenceModel.findOne({
      status: "approvedbyadmin",
    })
      .sort({ _id: -1 })
      .limit(1);

    if(to === "toAdd"){
      if (model === "reaserch") {
        addToConferenceR(latestConference._id, fileID, res);
      } else if (model === "workshop") {
        addToConferenceW(latestConference._id, fileID, res);
      }
    }else if(to === "toRemove"){
      if (model === "reaserch") {
        removeFromConferenceR(latestConference._id, fileID, res);
      } else if (model === "workshop") {
        removeFromConferenceW(latestConference._id, fileID, res);
      }
    }
  
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching conference id -" + error,
    });
  }
};

const addToConferenceW = async (confId, fileID, res) => {
  const workshop = {
    workshopID: fileID,
  };

  try {
    await ConferenceModel.findOneAndUpdate(
      { _id: confId },
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

const addToConferenceR = async (confId, fileID, res) => {
  const rpaper = {
    researchPaperID: fileID,
  };

  try {
    await ConferenceModel.findOneAndUpdate(
      { _id: confId },
      { $push: { addedResearchPapers: rpaper } }
    );
    return "added to conference";
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in adding workshop - " + error,
    });
  }
};

const removeFromConferenceW = async (confId, fileID, res) => {
  const workshop = {
    workshopID: fileID,
  };

  try {
    await ConferenceModel.findOneAndUpdate(
      { _id: confId },
      { $pull: { addedWorkshops: workshop } }
    );
    return "added to conference";
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in adding workshop - " + error,
    });
  }
};

const removeFromConferenceR = async (confId, fileID, res) => {
  const rpaper = {
    researchPaperID: fileID,
  };

  try {
    await ConferenceModel.findOneAndUpdate(
      { _id: confId },
      { $pull: { addedResearchPapers: rpaper } }
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
