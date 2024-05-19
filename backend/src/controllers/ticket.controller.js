const httpStatus = require('http-status');
const ticketService = require('../services/ticket.service');
const catchAsync = require('../utils/catchAsync');

const createTicket = catchAsync(async (req, res) => {
  console.log('ENTRA A CREAR UN TICKET')

  const group = req.params.groupId || null;
  const creator = req.user._id;

  const ticket = await ticketService.createTicket({ ...req.body, group_id: group, creator })

  return res.status(httpStatus.CREATED).send(ticket);
});

const getTickets = catchAsync(async (req, res) => {

  const groupId = req.params.groupId || null;
  const creator = req.user._id;
  const tickets = groupId ?
    await ticketService.getTicketsByGroup(groupId) :
    await ticketService.getIndividualTickets(creator);

  return res.status(httpStatus.OK).send(tickets);
});

module.exports = { createTicket, getTickets };
