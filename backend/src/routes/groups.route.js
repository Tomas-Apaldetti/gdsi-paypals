const { verifyToken } = require("../services/token.service")
const { createGroup, getGroups } = require("../controllers/groups.controller");
const express = require('express');
const { tokenTypes } = require("../config/tokens");
const router = express.Router();

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

module.exports = router;