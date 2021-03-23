// Require Express and Express router
const express = require('express')
const router = express.Router()

// Set up routes of home page
router.get('/', (req, res) => {
  res.send('hello world')
})

// Export
module.exports = router
