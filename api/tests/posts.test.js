const { describe } = require('eslint/lib/rule-tester/rule-tester')
const db = require('../../data/db-config')
const postModel = require('../posts/posts-model')
const userModel = require('../users/user-model')

const post1 = {post_content: 'abc123', user_id: 1}
const post2 = {post_content: 'abc1234', user_id: 2}
const user1 = {user_name: 'test'}
const user2 = {user_name: 'test2'}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db('posts').truncate()
})

afterAll(async () => {
    await db.destroy()
})

describe('Sanity Check', () => {
    test('Correct ENV Variable', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })
})

describe('Post model functions', () => {
    describe('Creates posts', () => {
        beforeEach(async () => {
            await userModel.create(user1)
        })
        test('Creates a new post in the database', async () => {
            await postModel.create(post1)
            const post = await db('posts')
            expect(post).toHaveLength(1)
        })
        test('Returns the correct post from the database after being created', async () => {
            const post = await postModel.create(post1)
            expect(post).toEqual({post_id: 1, post_content: 'abc123', user_id: 1})
        })
    })
    describe('Deletes posts', () => {
        beforeEach(async () => {
            await userModel.create(user1)
            await postModel.create(post1)
        })
        test('Deletes a post from the database', async () => {
            await postModel.remove(1)
            const posts = await db('posts')
            expect(posts).toHaveLength(0)
        })
        test('Returns the correct deleted post', async () => {
            const post = await postModel.remove(1)
            expect(post).toEqual({post_id: 1, post_content: 'abc123', user_id: 1})
        })
    })

    describe('Can get posts', () => {
        beforeEach(async () => {
            await userModel.create(user1)
            await userModel.create(user2)
            await postModel.create(post1)
            await postModel.create(post2)
        })
        test('Can return the correct ammount of posts from the db', async () => {
            const posts = await postModel.find()
            expect(posts).toHaveLength(2)
        })
        test('Returns the correct posts from the db', async () => {
            const posts = await postModel.find()
            expect(posts).toEqual([
                {post_id: 1,post_content: 'abc123', user_id: 1},
                {post_id: 2,post_content: 'abc1234', user_id: 2}
            ])
        })
    })
})