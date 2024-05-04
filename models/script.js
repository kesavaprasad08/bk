const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const scriptSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: Array,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  script: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Script", scriptSchema);
