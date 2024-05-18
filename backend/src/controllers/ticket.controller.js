const Ticket = require('../models/ticket.model');
const mongoose = require('mongoose');

const createTicket = async (req, res, next) => {

  try {
    const newTicket = new Ticket({
      ...req
    });

    const savedTicket = await newTicket.save();

    return savedTicket;
  
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};

const getGroupTickets = async (req) => {

  const group_id = mongoose.Types.ObjectId(req.group_id)

  try {
    const tickets = await Ticket.find({ group_id: { $in: [group_id]}})

    return tickets
  } catch (error) {
    console.error('Error fetching group tickets', error)
    throw error
  }

}

module.exports = {createTicket, getGroupTickets};
