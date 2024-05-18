const { verifyToken } = require("../services/token.service")
const { createGroup, getGroups, getGroupUsers } = require("../controllers/groups.controller");
const express = require('express');
const { tokenTypes } = require("../config/tokens");
const router = express.Router();
const { ticketValidation } = require('../validations/ticket.validation');
const { createTicket, getGroupTickets } = require("../controllers/ticket.controller");
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

router.post('/create', async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) return res.status(401).json({ message: "Token not provided" });

  const verifiedToken = await verifyToken(token, tokenTypes.ACCESS)

  if (verifiedToken && verifiedToken.user) {
    req.user = verifiedToken.user
    next()
  } else {
    return res.status(401).json({ message: "Token not found" }); 
  }
}, async (req, res) => {
  try {
    const newGroup = await createGroup({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.user
    });

    
    return res.status(200).json({ data: newGroup, msg: 'Group created' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/groups', async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) return res.status(401).json({ message: "Token not provided" });

  const verifiedToken = await verifyToken(token, tokenTypes.ACCESS)

  if (verifiedToken && verifiedToken.user) {
    req.user = verifiedToken.user
    next()
  } else {
    return res.status(401).json({ message: "Token not found" }); 
  }
}, async (req, res) => {
  try {

    const groups = await getGroups({ userId: req.user })
    
    return res.status(200).json({ data: groups, msg: 'Group created' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.post('/:groupId/ticket', auth('TODO'), validate(ticketValidation), async (req, res, next) => {
  const group_id = req.params.groupId // siempre va a ser un grupo, minimo una persona
  const creator = req.user._id;

  try {
    const newTicket = await createTicket({...req.body, group_id, creator});
    
    return res.status(200).json({ data: newTicket, msg: 'Group ticket created' });
  } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
  }

})

router.get('/:groupId/ticket', auth('TODO'), validate(ticketValidation), async (req, res, next) => {
  const group_id = req.params.groupId // siempre va a ser un grupo, minimo una persona

  try {
    const groupTickets = await getGroupTickets({ group_id })

    console.log(groupTickets)
    
    return res.status(200).json({ data: groupTickets, msg: 'Group ticekts' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }

})

router.get('/:groupId/users', auth('TODO'), validate(ticketValidation), async (req, res, next) => {
  const group_id = req.params.groupId

  try {
    const groupUsers = await getGroupUsers({ group_id })
    
    return res.status(200).json({ data: groupUsers, msg: 'Group users' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }

})

module.exports = router;