const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["full-time", "part-time", "contract", "internship"],
    },
    salary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["saved", "applied", "interviewing", "offer", "rejected"],
      default: "saved",
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add text index for search functionality
jobSchema.index({
  title: "text",
  company: "text",
  description: "text",
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
