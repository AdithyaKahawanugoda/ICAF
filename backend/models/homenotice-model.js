const mongoose = require("mongoose");

const HomeNoticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
});

const HomeNotice = mongoose.model("homenotice", HomeNoticeSchema);

module.exports = HomeNotice;
