const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema({
  amount: { type: Number, required: true },
  category: { type: String, default: "" },
  debtor: { type: String, default: "" },
  comments: { type: String, default: "" },
});

module.exports = mongoose.model("ticket", TicketSchema);