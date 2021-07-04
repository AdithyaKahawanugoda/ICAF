const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const GalleryScheema = new mongoose.Schema({
status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
  galleryImage: {
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
});

const Gallery = mongoose.model("gallery", GalleryScheema);

module.exports = Gallery;
