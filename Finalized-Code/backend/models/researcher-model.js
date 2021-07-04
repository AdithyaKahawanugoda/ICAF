const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ResearcherSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "researcher",
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
  researchData: [
    {
      status: {
        type: String,
        default: "pending",
      },
      payment: {
        type: String,
        default: "pending",
      },
      paymentHistory: {
        amount: { type: Number },
        placedAt: { type: Date },
      },

      researchTopic: {
        type: String,
        required: [true, "Please provide valid research details"],
      },
      researchSubject: {
        type: String,
        required: [true, "Please provide valid research details"],
      },
      paperAbstract: {
        type: String,
        required: [true, "Please provide valid research details"],
      },
      paperAuthors: [
        {
          type: String,
        },
      ],
      paperPublicId: {
        type: String,
        required: [
          true,
          "Error with cloudinary service! Can not find the paper URL.",
        ],
      },
      paperSecURL: {
        type: String,
        required: [
          true,
          "Error with cloudinary service! Can not find the paper URL.",
        ],
      },
    },
  ],
});

//by using "pre save" we run this code segment before mongoose save data on db
ResearcherSchema.pre("save", async function (next) {
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
ResearcherSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password); //password refers to user providing one and this.password refers to one that get from db
};

ResearcherSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Researcher = mongoose.model("researcher", ResearcherSchema);

module.exports = Researcher;
