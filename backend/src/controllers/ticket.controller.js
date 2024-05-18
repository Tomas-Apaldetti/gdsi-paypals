const Ticket = require('../models/ticket.model');

const createTicket = async (req, res, next) => {
  const groupId = req.params.groupId || null;
  const userId = req.user.id;

  const savedTicket = await new Ticket({
    ...req.body,
    groupId, 
    userId,
  }).save()

  try {
    const newTicket = new Ticket({
      amount: args.amount,
      category: args.category,
      debtor: args.debtor,
      comments: args.comments
    });

    const savedTicket = await newTicket.save();

    return savedTicket;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};

module.exports = {createTicket};
