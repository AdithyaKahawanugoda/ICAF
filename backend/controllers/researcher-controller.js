const ReserarcherModel = require("../models/researcher-model");
const AllUsersModel = require("../models/allusers-model");
const NotificationModel = require("../models/notification-model");
const ConferenceModel = require("../models/conference-model");
const { cloudinary } = require("../utils/cloudinary");

//CRUD operations of researcher details

//fetch researcher details
exports.getResearcherDetails = async (req, res) => {
  try {
    if (!req.user) {
      res.status(422).json({
        success: false,
        desc: "Can not find the user - Please check again",
      });
    } else {
      res.status(200).send({
        researcher: req.user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in get researcher Data controller-" + error,
    });
  }
};

//update researcher
exports.updateResearcherDetails = async (req, res) => {
  const { username, email } = req.body;

  if (email) {
    try {
      await AllUsersModel.findOneAndUpdate(
        { email: req.user.email },
        { email: email },
        { omitUndefined: true }
      );
    } catch (error) {
      res.status(500).json({
        success: false,
        desc:
          "Error in updateResearcherDetails-updateAllUsers controller-" + error,
      });
    }
  }

  try {
    const updatedresearcher = await ReserarcherModel.findByIdAndUpdate(
      req.user.id,
      {
        username,
        email,
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );
    res.status(200).send({
      success: true,
      desc: " updated successfully",
      updatedresearcher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in updateResearcherDetails controller-" + error,
    });
  }
};

//Update researcher profile photo
exports.updateProfilePicture = async (req, res) => {
  const { fileEnc } = req.body;

  try {
    const destroyedImage = await cloudinary.uploader.destroy(
      req.user.profileImage.imagePublicId
    );
    if (destroyedImage) {
      try {
        const uploadedResponse = await cloudinary.uploader.upload(fileEnc, {
          upload_preset: "Researcher-profile-pictures",
        });

        try {
          const updatedResearcher = await ReserarcherModel.findByIdAndUpdate(
            { _id: req.user._id },
            {
              profileImage: {
                imagePublicId: uploadedResponse.public_id,
                imageSecURL: uploadedResponse.secure_url,
              },
            },
            {
              new: true,
              upsert: false,
            }
          );
          res.status(200).send({
            success: true,
            desc: " updated successfully",
            updatedResearcher,
          });
        } catch (error) {
          res.status(500).json({
            success: false,
            desc: "Error in updating researcher profileImage data-" + error,
          });
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          desc: "Error in uploading new image-" + error,
        });
      }
    } else {
      res.status(500).json({
        success: false,
        desc: "Error in previous image remove-" + error,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in updateProfilePicture controller-" + error,
    });
  }
};

//delete researcher profile
exports.deleteResearcherDetails = async (req, res) => {
  try {
    await ReserarcherModel.findByIdAndDelete(req.user._id);
    await AllUsersModel.findOneAndRemove({ email: req.user.email });
    const cloudinaryRes = await cloudinary.uploader.destroy(
      req.user.profileImage.imagePublicId
    );

    res.status(200).send({
      status: true,
      desc: "deleted from the db",
      cloudinaryRes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in delete ResearcherDetails controller-" + error,
    });
  }
};

// add research Data
exports.addresearchData = async (req, res) => {
  const { researchTopic, researchSubject, paperAbstract, researchPaper,paperAuthors } =
    req.body;
    const data = {
      fromId: req.user._id,
      subject: "New research paper added",
      desc: "-New research paper has added which needs to be reviwed by the reviewer",
    };
  try {
    const rpaper = await cloudinary.uploader.upload(researchPaper, {
      upload_preset: "Researcher-Papers",
    });

    const researchdata = {
      paperAuthors,
      researchTopic,
      researchSubject,
      paperAbstract,
      paperPublicId: rpaper.public_id,
      paperSecURL: rpaper.secure_url,
    };

    const newPaper = await ReserarcherModel.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { researchData: researchdata } },
      {
        new: true,
      }
    );
    const result = await sendNotification(data, res);
    if (result) {
    res.status(201).send({ newPaper,success: true, result });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in resarchdata controller-" + error,
    });
  }
};

//update research data
exports.updateresearchdata = async (req, res) => {
  const { researchTopic, researchSubject, paperAbstract, rpID } = req.body;
  try {
    const result = await ReserarcherModel.findOneAndUpdate(
      { "researchData._id": rpID },
      {
        $set: {
          "researchData.$.researchTopic": researchTopic,
          "researchData.$.researchSubject": researchSubject,
          "researchData.$.paperAbstract": paperAbstract,
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );
    res
      .status(200)
      .json({ success: true, desc: " research paper updated", result });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in updateresearchdata controler-" + error,
    });
  }
};

//remove research data
exports.removeresearchData = async (req, res) => {
  const { rpID } = req.body;
  try {
    const updatedResearchData = await ReserarcherModel.updateOne(
      { _id: req.user._id },
      { $pull: { researchData: { _id: rpID } } },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      desc: " research paper deleted",
      updatedResearchData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in removeresearchData controler-" + error,
    });
  }
};

const sendNotification = async (data, res) => {
  try {
    const newNotification = await NotificationModel.create({
      from: {
        userRole: "researcher",
        userid: data.fromId,
      },
      to: {
        userRole: "reviewer",
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

//fetch notification
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find({
      "to.userid": req.user._id,
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

//pay for approved papers
exports.managePayment = async (req, res) => {
    const { paperID, confID } = req.body;
    try {
      const result = await ConferenceModel.findOneAndUpdate(
        { _id: confID },
        { $push: { addedResearchPapers: { researchPaperID: paperID } } },
        { new: true }
      );
      res.status(200).send({ result });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in managePayment controller-" + error,
      });
    }
  };