const express = require('express')
const router = express.Router()

// Require modules
const home = require('./modules/home')
const users = require('./modules/users')

// Direct request to modules
router.use('/users', users)
router.use('/', home)

// Export
module.exports = router
