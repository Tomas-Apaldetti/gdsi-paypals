const express = require('express');
const auth = require('../../middlewares/auth');
const ticketValidation = require('../../validations/ticket.validation');
const ticketController = require('../../controllers/ticket.controller')
const validate = require('../../middlewares/validate');

const maybeGroupRouter = express.Router({ mergeParams: true });

maybeGroupRouter
  .route('/')
  .post(auth('TODO'), validate(ticketValidation.createTicket), ticketController.createTicket)
  .get(auth('TODO'), ticketController.getTickets)

maybeGroupRouter
  .route('/:ticketId')
  .put(auth('TODO'), validate(ticketValidation.editTicket), ticketController.editTicket)

module.exports = {
  maybeGroupRouter
};
