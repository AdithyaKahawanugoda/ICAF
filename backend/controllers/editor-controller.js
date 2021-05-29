const ConferenceModel = require("../models/conference-model");
const HomeNoticesModel = require("../models/homenotice-model");
const NewsTimelineModel = require("../models/newstimeline-model");
const EditorModel = require("../models/editor-model");
const UserGuideModel = require("../models/userguide-model");
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
  let email = req.body.email;
  let username = req.body.username;
  if (!username) {
    username = req.user.username;
  }
  if (!email) {
    email = req.user.email;
  }
  try {
    const updatedUser = await EditorModel.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          username: username,
          email: email,
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

//add/overwrite pdf download templates
exports.addPdfTemplates = async (req, res) => {
  const { encPDF } = req.body;
  try {
    const uploadRes = await uploadFiles(encPDF, "Researcher-Papers", "pdf");
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
    const uploadRes = await uploadFiles(encPPT, "Workshop-Proposals", "pptx");
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
  try {
    const uploadRes = await uploadFiles(encCover, "Conference-Data", "img");
    const conference = await ConferenceModel.create({
      title,
      period,
      startingTime,
      about,
      venue,
      coverImage: {
        imagePublicId: uploadRes.public_id,
        imageSecURL: uploadRes.secure_url,
      },
    });
    res.status(201).json({ success: true, conference });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in addConference controller-" + error,
    });
  }
};

// update specific conference data
exports.updateConference = async (req, res) => {
  const { confID, title, period, startingTime, about, venue } = req.body;
  try {
    const updatedConference = await ConferenceModel.findByIdAndUpdate(
      confID,
      {
        $set: {
          title,
          period,
          startingTime,
          about,
          venue,
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
      desc: "conference data updated successfully",
      updatedConference,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in updateConference controller-" + error,
    });
  }
};

// delete specific conference
// exports.deleteConference = async (req, res) => {
// };

// add home notice
exports.addHomenotice = async (req, res) => {
  const { title, description } = req.body;
  try {
    const notice = await HomeNoticesModel.create({
      title,
      description,
    });
    res.status(201).json({ success: true, notice });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in addHomenotice controller-" + error,
    });
  }
};

// update home notice
exports.updateHomenotice = async (req, res) => {
  const { nID, title, description } = req.body;
  try {
    const updatedNotice = await HomeNoticesModel.findByIdAndUpdate(
      nID,
      {
        $set: {
          title,
          description,
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
      desc: "notice data updated successfully",
      updatedNotice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in updateHomenotice controller-" + error,
    });
  }
};

// delete home notice
// exports.deleteHomenotice = async (req, res) => {};

// add home news timeline data
exports.addTimelinedata = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newsTimeline = await NewsTimelineModel.create({
      title,
      description,
    });
    res.status(201).json({ success: true, newsTimeline });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in addTimelinedata controller-" + error,
    });
  }
};

// update home news timeline
exports.updateTimelinedata = async (req, res) => {
  const { ntID, title, description } = req.body;
  try {
    const updatedNews = await NewsTimelineModel.findByIdAndUpdate(
      ntID,
      {
        $set: {
          title,
          description,
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
      desc: "notice data updated successfully",
      updatedNews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in updateTimelinedata controller-" + error,
    });
  }
};

// delete home news timeline data
// exports.deleteTimelinedata = async (req, res) => {};

// add user guide details
exports.addUserGuide = async (req, res) => {
  const { sectionTitle, articleTitle, description } = req.body;
  try {
    const userGuide = await UserGuideModel.create({
      sectionTitle,
      articleTitle,
      description,
    });

    res.status(201).json({ success: true, userGuide });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in addUserGuide controller-" + error,
    });
  }
};

// update user guide details
exports.updateUserGuide = async (req, res) => {
  const { ugID, sectionTitle, articleTitle, description } = req.body;
  try {
    const userGuide = await UserGuideModel.findByIdAndUpdate(
      ugID,
      {
        $set: {
          sectionTitle,
          articleTitle,
          description,
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
      desc: "notice data updated successfully",
      userGuide,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in updateTimelinedata controller-" + error,
    });
  }
};

// delete user guide details
// exports.deleteUserGuide = async (req, res) => {};

const uploadFiles = async (file, presetName, mode) => {
  try {
    if (mode === "pptx") {
      const uploadResponse = await cloudinary.uploader.upload(file, {
        upload_preset: presetName,
        resource_type: "raw",
        format: "pptx",
      });
      return uploadResponse;
    } else {
      const uploadResponse = await cloudinary.uploader.upload(file, {
        upload_preset: presetName,
      });
      return uploadResponse;
    }
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
