const mongoose = require("mongoose");

const HomeNoticeSchema = new mongoose.Schema({
  status: { type: String, default: "pending" },
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
});

const HomeNotice = mongoose.model("homenotice", HomeNoticeSchema);

module.exports = HomeNotice;
