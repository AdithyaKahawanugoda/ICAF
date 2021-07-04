const mongoose = require("mongoose");

const UserGuideSchema = new mongoose.Schema({
  status: { type: String, default: "pending" },
  sectionTitle: { type: String, required: true },
  articleTitle: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserGuide = mongoose.model("userguide", UserGuideSchema);

module.exports = UserGuide;
