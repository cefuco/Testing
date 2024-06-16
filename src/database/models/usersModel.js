const { database } = require('../dbConfig');
const { handleHashPassword } = require('../../utils/utils')

const addUser = async (email, password, role) => {

    try {
        const emailExits = await getUserByEmail(email)

        if (!emailExits) {
            const consulta = "INSERT INTO usuarios (id, email, password, role) values (DEFAULT, $1, $2,$3) RETURNING *;"
            const values = [email, password, role]

            const { rowCount } = await database.query(consulta, values)

            if (rowCount) {

                return {
                    msg: 'Usuario Registrado',
                    ok: true
                }

            } else {
                return {
                    msg: 'Usuario no Registrado',
                    ok: true
                }
            }
        } else {
            const error = new Error('Email already used')
            error.code = 400
            error.msg = error.message
            throw error
        }

    } catch (error) {
        throw error
    }

}

const getUserByEmail = async (email) => {

    try {
        const consulta = "SELECT * FROM usuarios WHERE email = $1;"
        const values = [email]

        const { rows, rowCount } = await database.query(consulta, values)

        const user = rows[0];

        return user?.email
    } catch (error) {
        throw error
    }

}

const getPasswordUserByEmail = async (email) => {
    const consulta = "SELECT * FROM usuarios WHERE email = $1;"
    const values = [email]

    const { rows } = await database.query(consulta, values)

    const user = rows[0];

    return user.password
}




const UsersCollection = {
    getPasswordUserByEmail,
    getUserByEmail,
    addUser
}



module.exports = {
    UsersCollection
}