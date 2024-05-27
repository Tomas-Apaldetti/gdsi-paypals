const httpStatus = require('http-status');
const ticketService = require('../services/ticket.service');
const catchAsync = require('../utils/catchAsync');

const createTicket = catchAsync(async (req, res) => {
  const group = req.params.groupId || null;
  const creator = req.user._id;

  const ticket = await ticketService.createTicket({ ...req.body, group_id: group, creator });

  return res.status(httpStatus.CREATED).send(ticket);
});

const editTicket = catchAsync(async (req, res) => {
  const group = req.params.groupId || null;
  const creator = req.user._id;

  const ticket = await ticketService.editTicket(req.params.ticketId, { ...req.body, group_id: group, creator });

  return res.status(httpStatus.OK).send(ticket);
});

const getTickets = catchAsync(async (req, res) => {

  const groupId = req.params.groupId || null;
  const creator = req.user._id;
  const tickets = groupId
    ? await ticketService.getTicketsByGroup(groupId)
    : await ticketService.getIndividualTickets(creator);

  const transformed = transformTickets(tickets);
  return res.status(httpStatus.OK).send(transformed);
});

function transformTickets(tickets) {
  return tickets.map((ticket) => {
    return {
      ...ticket._doc,
      debtors: ticket.debtors.map((debtor) => ({
        _id: debtor._id.id,
        username: debtor._id.username,
        amount: (debtor.cut / 100) * ticket.amount,
      })),
      payments: [],
    };
  });
}

module.exports = { createTicket, editTicket, getTickets };
