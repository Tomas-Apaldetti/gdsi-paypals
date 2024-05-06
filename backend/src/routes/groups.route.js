const createGroup = require("../controllers/groups.controller");
const express = require('express');
const router = express.Router();

router.get('/create', async (req, res) => {
  try {
    const newGroup = await createGroup({
      name: 'FranYCaro',
      description: 'la mejor pareja',
      category: 'house'
    });
    
    return res.status(200).json({ data: newGroup, msg: 'Group created' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;