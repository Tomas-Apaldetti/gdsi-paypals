const httpStatus = require('http-status');
const { Ticket, DebtCancel } = require('../models');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');
const { debtCancellationTypes } = require('../config/constants');

const createTicket = async (ticketInfo) => {
  return Ticket.create(ticketInfo);
};

const editTicket = async (ticketId, ticketInfo) => {
  try {
    const updatedTicket = await Ticket.findOneAndUpdate({ _id: ticketId }, ticketInfo, { new: true });
    return updatedTicket;
  } catch (error) {
    console.error('Error updating ticket:', error);
    throw error;
  }
};

const getTicketsByGroup = async (group) => {
  if (!group) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Bad service usage');
  }
  return Ticket.find({
    group_id: mongoose.Types.ObjectId(group),
  })
    .populate({
      path: 'debtors._id',
      select: '_id username',
    })
    .populate({
      path: 'debt_cancellations.cancelled_by',
      select: '_id username',
    })
    .populate({
      path: 'debt_cancellations.for_whom',
      select: '_id username',
    });
};

const getIndividualTickets = async (creator) => {
  if (!creator) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Bad service usage');
  }
  return Ticket.find({
    creator: mongoose.Types.ObjectId(creator),
    group_id: null,
  })
    .populate({
      path: 'debtors._id',
      select: '_id username',
    })
    .populate({
      path: 'debt_cancellations.cancelled_by',
      select: '_id username',
    })
    .populate({
      path: 'debt_cancellations.for_whom',
      select: '_id username',
    });
};

const makePayment = async (ticketId, payor, amount, note = null) => {
  if (!payor || !ticketId) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Bad service usage');
  }

  const ticket = await Ticket.findOne({
    _id: mongoose.Types.ObjectId(ticketId),
    'debtors._id': mongoose.Types.ObjectId(payor),
  });

  if (!ticket) {
    throw new ApiError(httpStatus.NOT_FOUND, `Ticket ${ticketId} with debtor ${payor} not found`);
  }

  const cancellation = new DebtCancel({
    type: debtCancellationTypes.PAYMENT,
    cancelled_by: mongoose.Types.ObjectId(payor),
    for_whom: mongoose.Types.ObjectId(payor),
    amount: amount,
    note
  });
  ticket.debt_cancellations.push(cancellation);

  await ticket.save();

  return cancellation;
};

const makeWaiver = async (ticketId, forgiver, forgiven, note) => {
  if (!forgiver || !forgiven || !ticketId) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Bad service usage');
  }

  const ticket = await Ticket.findOne({
    _id: mongoose.Types.ObjectId(ticketId),
    creator: mongoose.Types.ObjectId(forgiver),
    'debtors._id': mongoose.Types.ObjectId(forgiven),
  });

  if (!ticket) {
    throw new ApiError(httpStatus.NOT_FOUND, `Ticket ${ticketId} with owner ${forgiver} and debtor ${forgiven} not found`);
  }

  if (
    ticket.debt_cancellations.find((debtCancel) => {
      return debtCancel.type === debtCancellationTypes.WAIVER && debtCancel.for_whom === mongoose.Types.ObjectId(forgiven);
    })
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Ticket ${ticketId} has already a waiver for debtor ${forgiven}`);
  }

  const cancellation = new DebtCancel({
    type: debtCancellationTypes.WAIVER,
    cancelled_by: mongoose.Types.ObjectId(forgiver),
    for_whom: mongoose.Types.ObjectId(forgiven),
    note
  });

  ticket.debt_cancellations.push(cancellation);

  await ticket.save();

  return cancellation;
};

module.exports = {
  createTicket,
  editTicket,
  getTicketsByGroup,
  getIndividualTickets,
  makePayment,
  makeWaiver,
};
