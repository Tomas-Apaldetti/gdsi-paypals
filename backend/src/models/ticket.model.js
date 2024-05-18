const mongoose = require("mongoose");

const DebtorSchema = mongoose.Schema({
  id: { type: mongoose.Types.ObjectId, required: true },
  cut: { type: Number, required: true },
});

const TicketSchema = mongoose.Schema({
  name: { type: String, default: "" },
  amount: { type: Number, required: true },
  group_id: { type: mongoose.Types.ObjectId, required: true },
  debtors: [DebtorSchema],
  split_type: { type: String, required: true },
  category: { type: String, default: "" },
  description: { type: String, default: "" },
});

module.exports = mongoose.model("ticket", TicketSchema);