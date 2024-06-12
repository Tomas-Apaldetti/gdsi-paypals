const httpStatus = require('http-status');
const ticketService = require('../services/ticket.service');
const catchAsync = require('../utils/catchAsync');
const { debtCancellationTypes } = require('../config/constants');

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

const payTicket = catchAsync(async (req, res) => {
  const ticketId = req.params.ticketId;
  const payor = req.user._id;
  const note = req.body.note || null;

  const payment = await ticketService.makePayment(ticketId, payor, req.body.amount, note);

  return res.status(httpStatus.CREATED).send(payment);
});

const waiveTicket = catchAsync(async (req, res) => {
  const ticketId = req.params.ticketId;
  const forgiver = req.user._id;
  const forgiven = req.body.for;
  const note = req.body.note || null;

  const waiver = await ticketService.makeWaiver(ticketId, forgiver, forgiven, note);

  return res.status(httpStatus.CREATED).send(waiver);
});

function transformTickets(tickets) {
  return tickets.map((ticket) => {
    return {
      ...ticket._doc,

      debtors: ticket.debtors.map((debtor) => ({
        _id: debtor._id.id,
        username: debtor._id.username,
        amount: debtor.cut
      })),

      payments: ticket.debt_cancellations
        .filter((debtCancel) => {
          return debtCancel.type === debtCancellationTypes.PAYMENT;
        })
        .map((debtCancel) => ({
          _id: debtCancel._id,
          from: {
            _id: debtCancel.for_whom._id,
            username: debtCancel.for_whom.username,
          },
          note: debtCancel.note,
          amount: debtCancel.amount || null,
          onDate: debtCancel.createdAt,
        })),

      waivers: ticket.debt_cancellations
        .filter((debtCancel) => {
          return debtCancel.type === debtCancellationTypes.WAIVER;
        })
        .map((debtCancel) => ({
          _id: debtCancel._id,
          to: {
            _id: debtCancel.for_whom._id,
            username: debtCancel.for_whom.username,
          },
          from: {
            _id: debtCancel.cancelled_by._id,
            username: debtCancel.cancelled_by.username,
          },
          note: debtCancel.note,
          onDate: debtCancel.createdAt,
        })),
    };
  });
}

module.exports = { createTicket, editTicket, getTickets, payTicket, waiveTicket };
