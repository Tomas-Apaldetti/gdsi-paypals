const createGroup = require("../controllers/groups.controller");
const express = require('express');
const router = express.Router();

router.post('/create', async (req, res) => {

  try {
    const newGroup = await createGroup({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category
    });

    
    return res.status(200).json({ data: newGroup, msg: 'Group created' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;