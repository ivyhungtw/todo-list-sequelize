const express = require('express')
const router = express.Router()

// Require modules
const home = require('./modules/home')
const users = require('./modules/users')
const todos = require('./modules/todos')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

// Direct request to modules
router.use('/todos', authenticator, todos)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

// Export
module.exports = router
