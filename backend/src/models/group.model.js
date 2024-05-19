const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const groupSchema = mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 30, trim: true },
    description: { type: String, default: '', maxlength: 255, trim: true },
    category: { type: String, default: '', maxlength: 255, trim: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    memebers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  },
);

ticketSchema.plugin(toJSON);

module.exports = mongoose.model('Group', groupSchema);
