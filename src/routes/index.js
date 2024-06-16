const router = require('express').Router()
const UsersRouter = require('./users/usersRouter')


router.use('/users', UsersRouter)

module.exports = router
