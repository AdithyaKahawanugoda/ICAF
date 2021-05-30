const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const WorkshopConductorSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "workshop conductor",
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false,
  },
  profileImage: {
    imagePublicId: {
      type: String,
      required: [
        true,
        "Error with cloudinary service! Can not find the paper URL.",
      ],
    },
    imageSecURL: {
      type: String,
      required: [
        true,
        "Error with cloudinary service! Can not find the paper URL.",
      ],
    },
  },
  workshopData: [
    {
      status: {
        type: String,
        default: "Pending",
      },
      workshopTopic: {
        type: String,
        required: [true, "Please provide valid research details"],
      },
      workshopDescription: {
        type: String,
        required: [true, "Please provide valid research details"],
      },
      proposalPublicId: {
        type: String,
        required: [
          true,
          "Error with cloudinary service! Can not find the workshop proposal ID.",
        ],
      },
      proposalSecURL: {
        type: String,
        required: [
          true,
          "Error with cloudinary service! Can not find the workshop proposal URL.",
        ],
      },
    },
  ],
});

//by using "pre save" we run this code segment before mongoose save data on db
WorkshopConductorSchema.pre("save", async function (next) {
  //check whether the password has already been hashed or not by using isModified
  if (!this.isModified("password")) {
    next();
  }

  //hash password before passing it to db save query through the model
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); //this.password reffers to password that contains within request object

  next();
});

//to compare hashed passwords in login scenarios
WorkshopConductorSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password); //password refers to user providing one and this.password refers to one that get from db
};

WorkshopConductorSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
const WorkshopConductor = mongoose.model(
  "workshop-conductor",
  WorkshopConductorSchema
);

module.exports = WorkshopConductor;
