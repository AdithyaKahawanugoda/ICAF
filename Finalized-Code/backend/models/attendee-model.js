const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AttendeeSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "attendee",
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
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
  paymentHistory: [
    {
      amount: { type: Number },
      placedAt: { type: Date, default: Date.now },
      description: { type: String },
    },
  ],
  purchasedTickets: [
    {
      ticketID: { type: mongoose.Schema.Types.ObjectId },
    },
  ],
});

//by using "pre save" we run this code segment before mongoose save data on db
AttendeeSchema.pre("save", async function (next) {
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
AttendeeSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password); //password refers to user providing one and this.password refers to one that get from db
};

AttendeeSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Attendee = mongoose.model("attendee", AttendeeSchema);

module.exports = Attendee;
