const mongoose = require("mongoose");

const StatSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  last_called: {
    type: Date,
    required: true,
  },
  calls: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Stats", StatSchema);
