const ConferenceModel = require("../models/conference-model");
const HomeNoticesModel = require("../models/homenotice-model");
const NewsTimelineModel = require("../models/newstimeline-model");
const ResearcherModel = require("../models/researcher-model");
const WorkshopConductorModel = require("../models/workshopconductor-model");
const GalleryModel = require("../models/gallery-model");
const EditorModel = require("../models/editor-model");

//fetch keynote speakers,venue and date/time from conference
exports.getConference = async (req, res) => {
  try {
    const latestConference = await ConferenceModel.findOne({
      status: "approvedbyadmin",
    })
      .sort({ _id: -1 })
      .limit(1);
    res.status(200).send({
      latestConference,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getConference controller-" + error,
    });
  }
};

//fetch home notices data
exports.getNotices = async (req, res) => {
  try {
    const allNotices = await HomeNoticesModel.find();
    res.status(200).send({
      allNotices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getNotices controller-" + error,
    });
  }
};

//fetch news timeline data
exports.getTimeline = async (req, res) => {
  let timelines = [];
  try {
    const allNews = await NewsTimelineModel.find();
    for (let i = 0; i < allNews.length; i++) {
      timelines.push(allNews[i]);
    }
    let temp = 0;
    for (let i = 0; i < allNews.length - 1; i++) {
      if (timelines[i].position > timelines[i + 1].position) {
        temp = timelines[i];

        timelines[i] = timelines[i + 1];
        timelines[i + 1] = temp;
      }
    }
    res.status(200).send({
      timelines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getTimeline controller-" + error,
    });
  }
};

//fetch specific research paper data
exports.getResearch = async (req, res) => {
  const rID = req.params.rID;
  try {
    const researchpaper = await ResearcherModel.findOne({
      "researchData._id": rID,
    });
    res.status(200).send({
      researchpaper,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getResearch controller-" + error,
    });
  }
};

//fetch specific workshop data
exports.getWorkshop = async (req, res) => {
  const wID = req.params.wID;
  try {
    const workshop = await WorkshopConductorModel.findOne({
      "workshopData._id": wID,
    });
    res.status(200).send({
      workshop,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getWorkshop controller-" + error,
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
      desc: "Error in fetching gallery in Guest controller -" + error,
    });
  }
};


exports.getTemplates = async (req, res) => {
  try {
    const templates = await EditorModel.findOne();
    res.status(200).send({ templates: templates.downloadTemplate });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching Templates in guest controller -" + err,
    });
  }
};