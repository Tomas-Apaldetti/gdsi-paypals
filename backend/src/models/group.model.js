const mongoose = require("mongoose");
const GroupSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  category: { type: String, default: "" },
  users: [mongoose.Types.ObjectId]
});

module.exports = mongoose.model("group", GroupSchema);