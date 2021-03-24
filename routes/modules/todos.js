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

router.get('/:id/edit', async (req, res) => {
  const UserId = req.user.id
  const id = req.params.id

  const todo = await Todo.findOne({ where: { id, UserId } })
  res.render('edit', { todo: todo.toJSON() })
})

router.put('/:id', async (req, res) => {
  try {
    const UserId = req.user.id
    const id = req.params.id
    const { name, isDone } = req.body

    let todo = await Todo.findOne({ where: { id, UserId } })
    todo.name = name
    todo.isDone = isDone === 'on'
    await todo.save()

    res.redirect(`/todos/${id}`)
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id', async (req, res) => {
  const UserId = req.user.id
  const id = req.params.id

  const todo = await Todo.findOne({ where: { id, UserId } })
  await todo.destroy()

  res.redirect('/')
})

// Export
module.exports = router
