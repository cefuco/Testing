require('dotenv').config()
const { database, initDB, cleanDB } = require('../database/dbConfig')

const app = require('../app')
const request = require('supertest')
const jwt = require('jsonwebtoken')


beforeAll(async () => {
    await initDB()
})

afterEach(async () => {
    await cleanDB()
})

afterAll(async () => {
    await database.end();
})


describe('UserController', () => {

    describe('add_user_controller', () => {

        it('Debería agregar un usuario', async () => {
            const email = "test@gmail.com"
            const password = "12345"
            const role = 'admin'

            const response = await request(app)
                .post('/api/users/register')
                .send({
                    email, password, role
                })

            expect(response.status).toBe(200);
            expect(response.body.msg).toBe('Usuario Registrado')

        })

        it('Debería devolver un error si el email ya existe', async () => {
            const email = "test@gmail.com"
            const password = "12345"
            const role = 'admin'

            await request(app)
                .post('/api/users/register')
                .send({
                    email, password, role
                })

            const response = await request(app)
                .post('/api/users/register')
                .send({
                    email, password, role
                })

            expect(response.status).toBe(400);
            expect(response.body.msg).toContain('Email already used')

        })


    })


    describe('get_profile_controller', () => {
        it('Deberia devolver un perfil', async () => {
            // Generar el token
            const token = jwt.sign({ email: 'profile@gmail.com' }, process.env.JWT_SECRET)

            const response = await request(app)
                .get('/api/users/perfil')
                .set('Authorization', `Bearer ${token}`)


            expect(response.status).toBe(200)
            expect(response.body.user.email).toBe('profile@gmail.com')
        })
    })

})