const mongoose = require("mongoose");
const { toJSON } = require("./plugins");

const debtorSchema = mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  cut: { type: Number, required: true },
});


const ticketSchema = mongoose.Schema({
  name: { type: String, required: true, maxlength:  255, trim: true},
  amount: { type: Number, required: true , min: 0.01, },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
  group_id: { type: mongoose.Types.ObjectId, default: null, ref: 'Group' },
  debtors: [debtorSchema],
  split_type: { type: String, enum: ['PERCENTAGE', 'FIXED', 'EQUALLY'], required: true },
  category: { type: String, default: "" },
  comment: { type: String, default: '', maxlength: 255, trim: true },
});

// add plugin that converts mongoose to json
ticketSchema.plugin(toJSON);

module.exports = mongoose.model("Ticket", ticketSchema);
