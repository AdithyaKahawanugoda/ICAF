const mongoose = require("mongoose");

const ConferenceSchema = new mongoose.Schema({
  status: { type: String, default: "pending" },
  title: { type: String, required: true },
  period: { type: String, required: true },
  startingTime: { type: String, required: true },
  about: { type: String, required: true },
  venue: { type: String, required: true },
  coverImage: {
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
  keynoteSpeakers: [
    {
      name: { type: String, required: true },
      associatewith: { type: String, required: true },
      coverletter: { type: String, required: true },
      image: {
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
    },
  ],
  guestSpeakers: [
    {
      name: { type: String, required: true },
      associatewith: { type: String, required: true },
      coverletter: { type: String, required: true },
      image: {
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
    },
  ],
  addedWorkshops: [{ workshopID: { type: mongoose.Schema.Types.ObjectId } }],
  addedResearchPapers: [
    { researchPaperID: { type: mongoose.Schema.Types.ObjectId } },
  ],
});

const Conference = mongoose.model("conference", ConferenceSchema);

module.exports = Conference;
