const mongoose = require("mongoose");

const NotificationChannelSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  from: {
    userid: { type: mongoose.Schema.Types.ObjectId },
    userRole: { type: String, required: true },
  },
  to: {
    userid: { type: mongoose.Schema.Types.ObjectId },
    userRole: { type: String, required: true },
  },
  status: { type: String, default: "unread" },
  createdAt: { type: Date, default: Date.now },
});

const NotificationChannel = mongoose.model(
  "notification",
  NotificationChannelSchema
);

module.exports = NotificationChannel;
