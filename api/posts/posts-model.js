const db = require('../../data/db-config')

function find(){
    return db('posts')
}

async function create(post){
    const [id] = await db('posts').insert(post)
    return await db('posts')
    .where('post_id', id)
    .first()
}

async function remove(id){
    const deletedPost = await db('posts')
    .where('post_id', id)
    .first()
    const deletePost = await db('posts')
    .del(id)
    return deletedPost
}

module.exports = {
    find,
    create,
    remove,
}