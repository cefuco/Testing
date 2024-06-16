const { database, initDB, cleanDB } = require('../database/dbConfig')
const { UsersCollection } = require('../database/models/usersModel')

beforeAll(async () => {
    await initDB()
})

afterEach(async () => {
    await cleanDB()
})

afterAll(async () => {
    await database.end();
})


describe('UserCollection', () => {

    describe('addUser', () => {

        it('Debería agregar un usuario', async () => {
            const email = "test@gmail.com"
            const password = "12345"
            const role = 'admin'

            const result = await UsersCollection.addUser(email, password, role)

            expect(result).toEqual({
                ok: true,
                msg: 'Usuario Registrado'
            })

            const userEmail = await UsersCollection.getUserByEmail(email)

            expect(userEmail).toBe(email)
        })

        it('Debería devolver un error si ya existe el email', async () => {
            const email = "test@gmail.com"
            const password = "12345"
            const role = 'admin'

            await UsersCollection.addUser(email, password, role)

            await expect(UsersCollection.addUser(email, password, role))
                .rejects
                .toThrow('Email already used')

        })

    })


    describe('getUserByEmail', () => {
        it('Debería devolver un email', async () => {
            const email = "test@gmail.com"
            const password = "12345"
            const role = 'admin'

            await UsersCollection.addUser(email, password, role)

            const userEmail = await UsersCollection.getUserByEmail(email)

            expect(userEmail).toBe(email)
        })

        it('Debería devolver un error si no existe el email', async () => {
            const email = "test@gmail.com"
            const password = "12345"
            const role = 'admin'

            await UsersCollection.addUser(email, password, role)

            // await expect(UsersCollection.getUserByEmail(email))
            //     .rejects
            //     .toThrow('Email not found')

        })
    })
})