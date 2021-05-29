const ConferenceModel = require("../models/conference-model");
const HomeNoticesModel = require("../models/homenotice-model");
const NewsTimelineModel = require("../models/newstimeline-model");
const ResearcherModel = require("../models/researcher-model");
const WorkshopConductorModel = require("../models/workshopconductor-model");

//fetch keynote speakers,venue and date/time from conference
exports.getConference = async (req, res) => {
  try {
    const latestConference = await ConferenceModel.findOne();
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
  try {
    const allNews = await NewsTimelineModel.find();
    res.status(200).send({
      allNews,
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
  const rID = req.params;
  try {
    const researchpaper = await ResearcherModel.findOne({ rID });
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
  const wID = req.params;
  try {
    const workshop = await WorkshopConductorModel.findOne({ wID });
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
