const request = require("supertest")
const db = require('../../data/db-config')
// const server = require('../server')
const userModel = require('../users/user-model')

const user1 = {user_name: 'Tom'}
const user2 = {user_name: 'Jerry'}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db('users').truncate()
})

afterAll(async () => {
    await db.destroy()
})

describe('Sanity Check', () => {
    test('Correct ENV Variable', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })
})

describe('Users model functions', () => {
    describe('create users', () => {
        test('adds user to the database', async () => {
             await userModel.create(user2)
             const user = await db('users')
            expect(user).toHaveLength(1)
        })
        test('returns the correct user after being added to the db', async () => {
            const user = await userModel.create(user1)
            expect(user).toEqual({user_id: 1, user_name: 'Tom'})
        })
    })
    describe('delete users', () => {
        beforeEach(async () => {
            await userModel.create(user1)
        })
        test('deletes a user from the database', async () => {
            await userModel.remove(1)
            const users = await db('users')
            expect(users).toHaveLength(0)
        })
        test('returns the correct deleted user', async () => {
            const user = await userModel.remove(1)
            expect(user).toEqual({user_id: 1, user_name: 'Tom'})
        })
    })
})