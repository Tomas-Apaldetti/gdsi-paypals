const Ticket = require('../models/ticket.model');

const createTicket = async (args) => {

  console.log(args)

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

module.exports = createTicket;