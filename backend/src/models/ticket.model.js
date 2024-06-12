const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { debtCancellationTypes, debtSplitTypes } = require('../config/constants');

const debtorSchema = mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  cut: { type: Number, required: true },
});

const debtCancellationSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: Object.values(debtCancellationTypes),
    },
    cancelled_by: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    for_whom: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    amount: {
      type: Number,
      required: function () {
        return this.type === debtCancellationTypes.PAYMENT;
      },
      min: [0.01, 'The minimum payment should be $0.01'],
      validate: {
        validator: function () {
          return this.type !== debtCancellationTypes.WAIVER;
        },
        message: 'The amount should not be set when the cancellation is a WAIVER',
      },
    },
    note: {
      type: String,
      maxlength: 255,
    },
  },
  {
    timestamps: true,
  },
);

debtCancellationSchema.plugin(toJSON);

const ticketSchema = mongoose.Schema({
  name: { type: String, required: true, maxlength: 255, trim: true },
  amount: { type: Number, required: true, min: 0.01 },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  group_id: { type: mongoose.Types.ObjectId, default: null, ref: 'Group' },
  debtors: [debtorSchema],
  split_type: { type: String, enum: Object.values(debtSplitTypes), required: true },
  category: { type: String, default: '' },
  comment: { type: String, default: '', maxlength: 255, trim: true },
  debt_cancellations: [debtCancellationSchema],
});

// add plugin that converts mongoose to json
ticketSchema.plugin(toJSON);

module.exports = {
  DebtCancellation: mongoose.model('DebtCancellation', debtCancellationSchema),
  Ticket: mongoose.model('Ticket', ticketSchema),
};
