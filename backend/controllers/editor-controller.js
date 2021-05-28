const ConferenceModel = require("../models/conference-model");
const HomeNoticesModel = require("../models/homenotice-model");
const NewsTimelineModel = require("../models/newstimeline-model");
const EditorModel = require("../models/editor-model");
const AllUsersModel = require("../models/allusers-model");
const { cloudinary } = require("../utils/cloudinary");

// fetch editor profile data
exports.getEditor = async (req, res) => {
  try {
    if (!req.user) {
      res.status(422).json({
        success: false,
        desc: "Can not find the user - Please check again",
      });
    } else {
      res.status(200).send({
        customer: req.user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getEditor controller-" + error,
    });
  }
};

// update editor profile data
exports.updateEditor = async (req, res) => {
  const { username, email } = req.body;
  try {
    const updatedUser = await EditorModel.findByIdAndUpdate(
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
      }
    );
    res.status(200).send({
      success: true,
      desc: "user updated successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in updateEditor controller-" + error,
    });
  }
};

// add/overwrite pdf download templates
exports.addPdfTemplates = async (req, res) => {
  const { encPDF } = req.body;
  try {
    const uploadRes = await uploadFiles(encPDF, "Researcher-Papers");
    if (req.user.downloadTemplate.pdfPublicId) {
      //delete previous data on cloudinary
      await deleteFiles(req.user.downloadTemplate.pdfPublicId);
    }
    const updatedTemplate = await EditorModel.updateOne(
      { _id: req.user.id },
      {
        $set: {
          pdfPublicId: uploadRes.public_id,
          pdfSecURL: uploadRes.secure_url,
        },
      },
      { new: true, upsert: true }
    );
    res.status(201).json({ success: true, updatedTemplate });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in addPdfTemplates controller-" + error,
    });
  }
};

// add/overwrite ppt download templates
exports.addPptTemplates = async (req, res) => {
  const { encPPT } = req.body;
  try {
    const uploadRes = await uploadFiles(encPPT, "Workshop-Proposals");
    if (req.user.downloadTemplate.pptPublicId) {
      //delete previous data on cloudinary
      await deleteFiles(req.user.downloadTemplate.pptPublicId);
    }
    const updatedTemplate = await EditorModel.updateOne(
      { _id: req.user.id },
      {
        $set: {
          pptPublicId: uploadRes.public_id,
          pptSecURL: uploadRes.secure_url,
        },
      },
      { new: true, upsert: true }
    );
    res.status(201).json({ success: true, updatedTemplate });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in addPptTemplates controller-" + error,
    });
  }
};

// add new conference to database
exports.addConference = async (req, res) => {
  const { title, period, startingTime, about, venue, encCover } = req.body;
};

// update specific conference data
exports.updateConference = async (req, res) => {};

// delete specific conference
exports.deleteConference = async (req, res) => {};

// add home notice
exports.addHomenotice = async (req, res) => {};

// update home notice
exports.updateHomenotice = async (req, res) => {};

// delete home notice
exports.deleteHomenotice = async (req, res) => {};

// add home news timeline data
exports.addTimelinedata = async (req, res) => {};

// update home news timeline
exports.updateTimelinedata = async (req, res) => {};

// delete home news timeline data
exports.deleteTimelinedata = async (req, res) => {};

// add user guide details
exports.addUserGuide = async (req, res) => {};

// update user guide details
exports.updateUserGuide = async (req, res) => {};

// delete user guide details
exports.deleteUserGuide = async (req, res) => {};

const uploadFiles = async (file, presetName) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      upload_preset: presetName,
    });
    return uploadResponse;
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in uploadFiles controller-" + error,
    });
  }
};

const deleteFiles = async (filePID) => {
  try {
    await cloudinary.uploader.destroy(filePID);
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in deleteFiles controller-" + error,
    });
  }
};
