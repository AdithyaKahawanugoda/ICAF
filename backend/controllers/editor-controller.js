const ConferenceModel = require("../models/conference-model");
const HomeNoticesModel = require("../models/homenotice-model");
const NewsTimelineModel = require("../models/newstimeline-model");
const EditorModel = require("../models/editor-model");
const UserGuideModel = require("../models/userguide-model");
const NotificationModel = require("../models/notification-model");
const GalleryModel = require("../models/gallery-model");
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
        editor: req.user,
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
  let { email, username } = req.body;

  if (!email) {
    email = req.user.email;
  }
  if (!username) {
    email = req.user.username;
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
        omitUndefined: true,
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
          "downloadTemplate.pdfPublicId": uploadRes.public_id,
          "downloadTemplate.pdfSecURL": uploadRes.secure_url,
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
          "downloadTemplate.pptPublicId": uploadRes.public_id,
          "downloadTemplate.pptSecURL": uploadRes.secure_url,
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
  const data = {
    fromId: req.user._id,
    subject: "New Conference added",
    desc: "-editor has added new conference into the database, make sure to check before varifying content.",
  };
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
    const result = await sendNotification(data, res);
    if (result) {
      res.status(201).json({ success: true, conference, result });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in addConference controller-" + error,
    });
  }
};

// update specific conference data
exports.updateConference = async (req, res) => {
  let { confID, title, period, startingTime, about, venue, status } = req.body;
  if (!title) {
    title = undefined;
  }
  if (!period) {
    period = undefined;
  }
  if (!startingTime) {
    startingTime = undefined;
  }
  if (!about) {
    about = undefined;
  }
  if (!venue) {
    venue = undefined;
  }
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
          status,
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

exports.addSpeaker = async (req, res) => {
  const { name, associatewith, coverletter, ppEnc, type, confID } = req.body;
  const data = {
    fromId: req.user._id,
    subject: "New Speaker added",
    desc: "-editor has added new conference speaker into the database, make sure to check before varifying content.",
  };

  try {
    const uploadRes = await uploadFiles(ppEnc, "Conference-Data", "img");
    const speakerData = {
      name,
      associatewith,
      coverletter,
      image: {
        imagePublicId: uploadRes.public_id,
        imageSecURL: uploadRes.secure_url,
      },
    };

    if (type === "keynotespeaker") {
      const newSpeaker = await ConferenceModel.findOneAndUpdate(
        { _id: confID },
        { $push: { keynoteSpeakers: speakerData } },
        {
          new: true,
        }
      );
      const result = await sendNotification(data, res);
      if (result) {
        await changeConferenceStatus(confID, res);
        res.status(200).send({ newSpeaker });
      }
    } else {
      const newSpeaker = await ConferenceModel.findOneAndUpdate(
        { _id: confID },
        { $push: { guestSpeakers: speakerData } },
        {
          new: true,
        }
      );
      const result = await sendNotification(data, res);
      if (result) {
        await changeConferenceStatus(confID, res);
        res.status(200).send({ newSpeaker });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in addSpeaker controller-" + error,
    });
  }
};

exports.editSpeaker = async (req, res) => {
  let { speakerID, confID, name, associatewith, coverletter, type } = req.body;

  if (!name) {
    name = undefined;
  }
  if (!associatewith) {
    associatewith = undefined;
  }
  if (!coverletter) {
    coverletter = undefined;
  }

  const data = {
    fromId: req.user._id,
    subject: "Speaker data modified",
    desc: "-editor has updated some conference speaker data, make sure to check before varifying content.",
  };
  try {
    if (type === "keynotespeaker") {
      const speaker = await ConferenceModel.findOneAndUpdate(
        { "keynoteSpeakers._id": speakerID },
        {
          $set: {
            "keynoteSpeakers.$.name": name,
            "keynoteSpeakers.$.associatewith": associatewith,
            "keynoteSpeakers.$.coverletter": coverletter,
          },
        },
        {
          new: true,
          upsert: false,
          omitUndefined: true,
        }
      );
      const result = await sendNotification(data, res);
      if (result) {
        await changeConferenceStatus(confID, res);
        res
          .status(200)
          .json({ success: true, desc: "Keynotespeaker updated", speaker });
      }
    } else {
      const speaker = await ConferenceModel.findOneAndUpdate(
        { "guestSpeakers._id": speakerID },
        {
          $set: {
            "guestSpeakers.$.name": name,
            "guestSpeakers.$.associatewith": associatewith,
            "guestSpeakers.$.coverletter": coverletter,
          },
        },
        {
          new: true,
          upsert: false,
          omitUndefined: true,
        }
      );
      const result = await sendNotification(data, res);
      if (result) {
        await changeConferenceStatus(confID, res);
        res
          .status(200)
          .json({ success: true, desc: "Guest-speaker updated", speaker });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in editSpeaker controller-" + error,
    });
  }
};

exports.requestSpeakerRemove = async (req, res) => {
  const { confID, speakerID, type } = req.body;
  const data = {
    fromId: req.user._id,
    subject: "Request conference modification",
    desc: `-editor has requested to remove one of the conference speaker, make sure to check before varifying content.
    conference ID: ${confID} | speaker ID: ${speakerID} | speaker type: ${type}`,
  };
  try {
    const result = await sendNotification(data, res);
    if (result) {
      res
        .status(200)
        .json({ success: true, desc: "Keynotespeaker modification requested" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in requestSpeakerRemove controler-" + error,
    });
  }
};

// add home notice
exports.addHomenotice = async (req, res) => {
  const { title, description } = req.body;
  const data = {
    fromId: req.user._id,
    subject: "New HomeNotice added",
    desc: "-editor has added new homepage notice into the database, make sure to check before varifying content.",
  };
  try {
    const notice = await HomeNoticesModel.create({
      title,
      description,
    });
    const result = await sendNotification(data, res);
    if (result) {
      res.status(201).json({ success: true, notice, result });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in addHomenotice controller-" + error,
    });
  }
};

// update home notice
exports.updateHomenotice = async (req, res) => {
  let { nID, title, description, status } = req.body;
  if (!title) {
    title = undefined;
  }
  if (!description) {
    description = undefined;
  }
  try {
    const updatedNotice = await HomeNoticesModel.findByIdAndUpdate(
      nID,
      {
        title,
        description,
        status,
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

exports.requestNoticeRemove = async (req, res) => {
  const { nID } = req.body;
  const data = {
    fromId: req.user._id,
    subject: "Request home-notices modification",
    desc: `-editor has requested to remove one of the home notice, make sure to check before varifying content.
    notice ID: ${nID} `,
  };
  try {
    const result = await sendNotification(data, res);
    if (result) {
      res
        .status(200)
        .json({ success: true, desc: "Home-Notices modification requested" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in requestNoticeRemove controler-" + error,
    });
  }
};

// add home news timeline data
exports.addTimelinedata = async (req, res) => {
  const { title, description, position } = req.body;
  const data = {
    fromId: req.user._id,
    subject: "New Timeline news added",
    desc: "-editor has added new timeline section into the database, make sure to check before varifying content.",
  };
  try {
    const newsTimeline = await NewsTimelineModel.create({
      title,
      description,
      position,
    });
    const result = await sendNotification(data, res);
    if (result) {
      res.status(201).json({ success: true, newsTimeline, result });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in addTimelinedata controller-" + error,
    });
  }
};

// update home news timeline
exports.updateTimelinedata = async (req, res) => {
  let { ntID, title, description, status } = req.body;
  if (!title) {
    title = undefined;
  }
  if (!description) {
    description = undefined;
  }
  try {
    const updatedNews = await NewsTimelineModel.findByIdAndUpdate(
      ntID,
      {
        $set: {
          title: title,
          description: description,
          status: status,
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

exports.requestNewsRemove = async (req, res) => {
  const { nID } = req.body;
  const data = {
    fromId: req.user._id,
    subject: "Request timeline-news modification",
    desc: `-editor has requested to remove one of the home timeline-item, make sure to check before varifying content.
    news ID: ${nID} `,
  };
  try {
    const result = await sendNotification(data, res);
    if (result) {
      res
        .status(200)
        .json({ success: true, desc: "Timeline-news modification requested" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in requestNewsRemove controler-" + error,
    });
  }
};

// add user guide details
exports.addUserGuide = async (req, res) => {
  const { sectionTitle, articleTitle, description } = req.body;
  const data = {
    fromId: req.user._id,
    subject: "New UserGuide added",
    desc: "-editor has added new user guide section into the database, make sure to check before varifying content.",
  };

  try {
    const userGuide = await UserGuideModel.create({
      sectionTitle,
      articleTitle,
      description,
    });
    const result = await sendNotification(data, res);
    if (result) {
      res.status(201).json({ success: true, userGuide, result });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in addUserGuide controller-" + error,
    });
  }
};

// update user guide details
exports.updateUserGuide = async (req, res) => {
  const { ugID, sectionTitle, articleTitle, description, status } = req.body;
  try {
    const userGuide = await UserGuideModel.findByIdAndUpdate(
      { _id: ugID },
      {
        sectionTitle,
        articleTitle,
        description,
        status,
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

exports.requestGuideRemove = async (req, res) => {
  const { gID } = req.body;
  const data = {
    fromId: req.user._id,
    subject: "Request Userguide modification",
    desc: `-editor has requested to remove one of the user-guide section, make sure to check before varifying content.
    User-guide ID: ${gID} `,
  };
  try {
    const result = await sendNotification(data, res);
    if (result) {
      res
        .status(200)
        .json({ success: true, desc: "Userguide modification requested" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in requestGuideRemove controler-" + error,
    });
  }
};

// add home gallery image
exports.addGaleryImage = async (req, res) => {
  const { fileEnc } = req.body;
  try {
    const uploadedResponse = await cloudinary.uploader.upload(fileEnc, {
      upload_preset: "Gallery-images",
    });

    await GalleryModel.create({
      galleryImage: {
        imagePublicId: uploadedResponse.public_id,
        imageSecURL: uploadedResponse.secure_url,
      },
    });
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({
      success: false,
      desc: "Error in Editor-controller image-add function-" + err,
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

const sendNotification = async (data, res) => {
  try {
    const newNotification = await NotificationModel.create({
      from: {
        userRole: "editor",
        userid: data.fromId,
      },
      to: {
        userRole: "admin",
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

const changeConferenceStatus = async (cID, res) => {
  try {
    await ConferenceModel.updateOne({ _id: cID }, { status: "pending" });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in changeConferenceStatus in editor controller - " + error,
    });
  }
};
