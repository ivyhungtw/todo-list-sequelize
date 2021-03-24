// Require Express and Express router
const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
const User = db.User

const passport = require('passport')
const bcrypt = require('bcryptjs')

// Set up routes
router.get('/login', (req, res) => {
  res.render('login', {
    email: req.session.email,
    password: req.session.password,
  })
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const emailRule = /^\w+((-\w+)|(\.\w+)|(\+\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
  const errors = []
  // Before creating an account,
  // make sure all the required fields are correct
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'Please fill out all fields.' })
  }
  if (email.search(emailRule) === -1) {
    errors.push({ message: 'Please enter the correct email address.' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Password and confirmPassword do not match.' })
  }
  if (errors.length > 0) {
    return res.render('register', {
      name,
      email,
      password,
      confirmPassword,
      errors,
    })
  }

  try {
    // make sure email has not been used yet
    const user = await User.findOne({ where: { email } })

    if (user) {
      req.session.email = email
      req.flash(
        'warning_msg',
        'A user with this email already exists. Choose a different address or login directly.'
      )
      return res.redirect('/users/register')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await User.create({ name, email, password: hash })

    // Show registered email and success message on login page
    req.session.email = email
    req.flash(
      'success_msg',
      `${req.body.email} register successfully! Please login.`
    )

    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Logout successfully!')
  req.session.email = ''
  req.session.password = ''
  res.redirect('/users/login')
})

// Export
module.exports = router
