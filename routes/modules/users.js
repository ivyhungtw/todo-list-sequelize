// Require Express and Express router
const express = require('express')
const router = express.Router()

// Set up routes
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.send('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  res.send('register')
})

router.get('/logout', (req, res) => {
  res.send('logout')
})

// Export
module.exports = router
