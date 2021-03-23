// Require Express and Express router
const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
const User = db.User

const passport = require('passport')

// Set up routes
router.get('/login', (req, res) => {
  res.render('login')
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

  try {
    // Create an account if the email has not been used
    const user = await User.findOne({ where: { email } })

    if (user) {
      console.log('User already exists')
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword,
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await User.create({ name, email, password: hash })

    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

router.get('/logout', (req, res) => {
  res.send('logout')
})

// Export
module.exports = router
