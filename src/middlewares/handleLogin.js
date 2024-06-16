
require('dotenv').config()

const jwt = require('jsonwebtoken');
const { handleVerifyPasswordHash } = require('../utils/utils');
const { UsersCollection } = require('../database/models/usersModel')


const handleLoginMiddleware = async (req, res, next) => {

    try {
        const { email, password } = req.body

        const passwordHash = await UsersCollection.getPasswordUserByEmail(email)
        const match = await handleVerifyPasswordHash(password, passwordHash)


        if (match) {

            const token = jwt.sign({ email }, process.env.JWT_SECRET)
            req.token = token
            next()

        } else {

            throw {
                code: 403, message: 'Error de credenciales', origin: 'Authorization'
            }
        }

    } catch (error) {
        next(error)
    }


}

module.exports = {
    handleLoginMiddleware
}