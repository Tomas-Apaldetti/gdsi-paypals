const createTicket = require("../controllers/ticket.controller");
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {

    try {
        const newTicket = await createTicket({
          amount: req.body.amount,
          category: req.body.category,
          debtor: req.body.debtor,
          comments: req.body.comments
        });
        
        return res.status(200).json({ data: newTicket, msg: 'Ticket created' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;