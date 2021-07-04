const jwt = require("jsonwebtoken");
const AdminModel = require("../models/admin-model");
const EditorModel = require("../models/editor-model");
const ReviewerModel = require("../models/reviewer-model");
const ResearcherModel = require("../models/researcher-model");
const AttendeeModel = require("../models/attendee-model");
const WorkshopConductorModel = require("../models/workshopconductor-model");

exports.protectedAdmin = async (req, res, next) => {
  let token;
  token = tokenValidate(req);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AdminModel.findById(decoded.id);
    if (!user) {
      noUserResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    invalidUserResponse(res, err);
  }
};
exports.protectedEditor = async (req, res, next) => {
  let token;
  token = tokenValidate(req);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await EditorModel.findById(decoded.id);
    if (!user) {
      noUserResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    invalidUserResponse(res, err);
  }
};
exports.protectedReviewer = async (req, res, next) => {
  let token;
  token = tokenValidate(req);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await ReviewerModel.findById(decoded.id);
    if (!user) {
      noUserResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    invalidUserResponse(res, err);
  }
};
exports.protectedResearcher = async (req, res, next) => {
  let token;
  token = tokenValidate(req);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await ResearcherModel.findById(decoded.id);
    if (!user) {
      noUserResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    invalidUserResponse(res, err);
  }
};
exports.protectedAttendee = async (req, res, next) => {
  let token;
  token = tokenValidate(req);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AttendeeModel.findById(decoded.id);
    if (!user) {
      noUserResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    invalidUserResponse(res, err);
  }
};
exports.protectedWorkshopConductor = async (req, res, next) => {
  let token;
  token = tokenValidate(req);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await WorkshopConductorModel.findById(decoded.id);
    if (!user) {
      noUserResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    invalidUserResponse(res, err);
  }
};

const tokenValidate = (reqObj) => {
  let token;
  if (
    reqObj.headers.authorization &&
    reqObj.headers.authorization.startsWith("Bearer")
  ) {
    token = reqObj.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({ success: false, desc: "Not Authorized to Access" });
  }
  return token;
};

const noUserResponse = (res) => {
  res.status(404).json({ success: false, desc: "No user found with this ID" });
};

const invalidUserResponse = (res, err) => {
  res
    .status(401)
    .json({ success: false, desc: "Something went wrong, Frobidden-" + err });
};
