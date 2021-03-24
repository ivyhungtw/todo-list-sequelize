// Require Express and Express router
const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
const User = db.User

// Set up routes of home page
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll({
      raw: true,
      nest: true,
      where: { UserId: req.user.id },
    })

    res.render('index', { todos })
  } catch (error) {
    return res.status(422).json(error)
  }
})

// Export
module.exports = router
