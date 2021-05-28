const AdminModel = require("../models/admin-model");
const EditorModel = require("../models/editor-model");
const ReviewerModel = require("../models/reviewer-model");
const ResearcherModel = require("../models/researcher-model");
const AttendeeModel = require("../models/attendee-model");
const WorkshopConductorModel = require("../models/workshopconductor-model");
const AllUsersModel = require("../models/allusers-model");
const { cloudinary } = require("../utils/cloudinary");

// login controller
exports.login = async (req, res) => {};

// register new admin - (for development purpose only)
exports.registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await AdminModel.create({
      email,
      password,
    });
    const token = await admin.getSignedToken();
    res.status(201).json({ success: true, token, role: "admin" });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in registerAdmin controller-" + error,
    });
  }
};

// register new editor - (for development purpose only)
exports.registerEditor = async (req, res) => {
  const { email, password } = req.body;
  try {
    const editor = await EditorModel.create({
      email,
      password,
    });
    const token = await editor.getSignedToken();
    res.status(201).json({ success: true, token, role: "editor" });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in registerEditor controller-" + error,
    });
  }
};

//register new reviewer - (for development purpose only)
exports.registerReviewer = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const reviewer = await ReviewerModel.create({
      email,
      password,
      username,
    });
    const token = await reviewer.getSignedToken();
    res.status(201).json({ success: true, token, role: "reviewer" });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in registerReviewer controller-" + error,
    });
  }
};

// register new researcher
exports.registerResearcher = async (req, res) => {
  const {
    username,
    email,
    password,
    topic,
    subject,
    abstract,
    authors,
    ppEnc,
    fileEnc,
  } = req.body;

  //check for users with same email address within customer collection
  let existingEmail = await findEmailDuplicates(email, res);

  if (existingEmail === null) {
    try {
      const ppUploadRes = await cloudinary.uploader.upload(ppEnc, {
        upload_preset: "Researcher-profile-pictures",
      });
      const fileUploadRes = await cloudinary.uploader.upload(fileEnc, {
        upload_preset: "Researcher-Papers",
      });

      let grabbedAuthors = authors.split(",");
      let modifiedAuthors = grabbedAuthors.map(function (element) {
        return element.trim();
      });
      const researcher = await ResearcherModel.create({
        username,
        email,
        password,
        profileImage: {
          imagePublicId: ppUploadRes.public_id,
          imageSecURL: ppUploadRes.secure_url,
        },
        researchData: [
          {
            researchTopic: topic,
            researchSubject: subject,
            paperAbstract: abstract,
            paperAuthors: modifiedAuthors,
            paperPublicId: fileUploadRes.public_id,
            paperSecURL: fileUploadRes.secure_url,
          },
        ],
      });
      const token = await researcher.getSignedToken();
      addToAllUsers(username, email, "researcher");
      res.status(201).json({ success: true, token });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in registerResearcher controller-" + error,
      });
    }
  }
};

// register new attendee
exports.registerAttendee = async (req, res) => {
  const { username, email, password, ppEnc, regFee, ticketID } = req.body;
  //check for users with same email address within customer collection
  let existingEmail = await findEmailDuplicates(email, res);
  if (existingEmail === null) {
    try {
      const ppUploadRes = await cloudinary.uploader.upload(ppEnc, {
        upload_preset: "Attendee-profile-pictures",
      });
      const attendee = await AttendeeModel.create({
        username,
        email,
        password,
        profileImage: {
          imagePublicId: ppUploadRes.public_id,
          imageSecURL: ppUploadRes.secure_url,
        },
        paymentHistory: [
          {
            amount: regFee,
            description: "Registration Fee to ICAF conference",
          },
        ],
        purchasedTickets: [{ ticketID }],
      });
      const token = await attendee.getSignedToken();
      addToAllUsers(username, email, "attendee");
      res.status(201).json({ success: true, token });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in registerAttendee controller-" + error,
      });
    }
  }
};

// register new workshop-conductor
exports.registerWorkshopConductor = async (req, res) => {
  const {
    username,
    email,
    password,
    topic,
    subject,
    description,
    ppEnc,
    fileEnc,
  } = req.body;

  //check for users with same email address within customer collection
  let existingEmail = await findEmailDuplicates(email, res);

  if (existingEmail === null) {
    try {
      const ppUploadRes = await cloudinary.uploader.upload(ppEnc, {
        upload_preset: "WorkshopConductor-profile-pictures",
      });
      console.log(ppUploadRes);
      const fileUploadRes = await cloudinary.uploader.upload(fileEnc, {
        upload_preset: "Workshop-Proposals",
      });
      console.log(fileUploadRes);
      const workshopconductor = await WorkshopConductorModel.create({
        username,
        email,
        password,
        profileImage: {
          imagePublicId: ppUploadRes.public_id,
          imageSecURL: ppUploadRes.secure_url,
        },
        worksopData: [
          {
            researchTopic: topic,
            researchSubject: subject,
            worksopDescription: description,
            paperPublicId: fileUploadRes.public_id,
            paperSecURL: fileUploadRes.secure_url,
          },
        ],
      });
      const token = await workshopconductor.getSignedToken();
      addToAllUsers(username, email, "workshop conductor");
      res.status(201).json({ success: true, token });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in registerWorkshopConductor controller-" + error,
      });
    }
  }
};

// find duplicated user emails before register new user
const findEmailDuplicates = async (email, res) => {
  try {
    const existingAccount = await AllUsersModel.findOne({ email: email });
    if (existingAccount) {
      res.status(401).json({
        success: false,
        desc: "Email already exist - Please check again",
      });
    } else {
      return existingAccount;
    }
  } catch (err) {
    res.status(422).json({
      success: false,
      desc: "Error occured in findUserByEmail segment-" + err,
    });
  }
};

const addToAllUsers = async (username, email, role) => {
  const createdAllUser = new AllUsersModel({
    username,
    email,
    role,
  });
  await createdAllUser.save();
};
