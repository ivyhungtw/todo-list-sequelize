// Require Express and Express router
const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
const User = db.User

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

router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  await User.create({ name, email, password })
  res.redirect('/')
})

router.get('/logout', (req, res) => {
  res.send('logout')
})

// Export
module.exports = router
