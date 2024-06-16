const { add_user_controller, get_profile_controller, login_controller } = require('../../controllers/users/usersController')
const { UsersValidatorCollection } = require('../../validators/users/usersValidotor')

const { handleLoginMiddleware } = require('../../middlewares/handleLogin')
const { authMiddleware } = require('../../middlewares/authMiddleware')

const router = require('express').Router()




router.post('/register', add_user_controller)

router.post('/login', handleLoginMiddleware, login_controller)

router.get('/perfil', authMiddleware, get_profile_controller)




module.exports = router