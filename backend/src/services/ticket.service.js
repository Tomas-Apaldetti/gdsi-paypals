const httpStatus = require("http-status")
const { Ticket } = require("../models")
const ApiError = require("../utils/ApiError")
const mongoose = require('mongoose');


const createTicket = async (ticketInfo) => {
  return Ticket.create(ticketInfo)
}

const editTicket = async (ticketId, ticketInfo) => {
  try {
    const updatedTicket = await Ticket.findOneAndUpdate(
      { _id: ticketId },
      ticketInfo,
      { new: true }
    );
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
    group_id: mongoose.Types.ObjectId(group)
  }).populate({
    path: 'debtors._id',
    select: '_id username',
  })
}

const getIndividualTickets = async (creator) => {
  if (!creator) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Bad service usage');
  }
  return Ticket.find({
    creator: mongoose.Types.ObjectId(creator),
    group_id: null
  }).populate({
    path: 'debtors._id',
    select: '_id username',
  })
}


module.exports = {
  createTicket,
  editTicket,
  getTicketsByGroup,
  getIndividualTickets
}
