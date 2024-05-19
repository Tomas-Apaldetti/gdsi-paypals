const httpStatus = require("http-status")
const { Ticket } = require("../models")
const ApiError = require("../utils/ApiError")
const mongoose = require('mongoose');


const createTicket = async (ticketInfo) => {
  console.log('TICKET INFO IS: ' + ticketInfo)
  return Ticket.create(ticketInfo)
}

const getTicketsByGroup = async (group) => {
  if (!group) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Bad service usage');
  }
  return Ticket.find({
    group_id: mongoose.Types.ObjectId(group)
  })
}

const getIndividualTickets = async (creator) => {
  if (!creator) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Bad service usage');
  }
  return Ticket.find({
    creator: mongoose.Types.ObjectId(creator),
    group_id: null
  })
}


module.exports = {
  createTicket,
  getTicketsByGroup,
  getIndividualTickets

}
