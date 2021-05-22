const mongoose = require("mongoose");

const NewsTimelineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const NewsTimeline = mongoose.model("newstimeline", NewsTimelineSchema);

module.exports = NewsTimeline;
