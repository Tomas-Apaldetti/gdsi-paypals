const express = require('express');
const router = express.Router();


router.get('/create', (req, res) => {
  console.log('estoy dentro del router')
  return res.status(200).json({ data: '', msg: 'Grupo creado'})
})


module.exports = router