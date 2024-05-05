const mongoose = require("mongoose");
const GroupSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  category: { type: String, default: "" },
});

module.exports = mongoose.model("group", GroupSchema);