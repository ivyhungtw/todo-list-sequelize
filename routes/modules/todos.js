// Require Express and Express router
const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
const User = db.User

// Set up routes
router.get('/new', async (req, res) => {
  res.render('new')
})

router.post('/', async (req, res) => {
  try {
    const UserId = req.user.id
    const name = req.body.name
    await Todo.create({ name, UserId })
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const todo = await Todo.findOne({ where: { id, UserId: req.user.id } })
    res.render('detail', { todo: todo.toJSON() })
  } catch (error) {
    console.log(error)
  }
})

// Export
module.exports = router
