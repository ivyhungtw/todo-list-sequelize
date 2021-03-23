const express = require('express')
const router = express.Router()

// Require modules
const home = require('./modules/home')
const users = require('./modules/users')
const todos = require('./modules/todos')

// Direct request to modules
router.use('/todos', todos)
router.use('/users', users)
router.use('/', home)

// Export
module.exports = router
