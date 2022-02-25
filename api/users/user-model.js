const db = require('../../data/db-config')

function find(){
    return db('users')
}

async function create(user){
    const [id] = await db('users').insert(user)
    return await db('users')
    .where('user_id', id)
    .first()
}

async function remove(id){
    const deletedUser = await db('users')
    .where('user_id', id)
    .first()
    const deleteUser = await db('users')
    .del(id)
    return deletedUser
}

module.exports = {
    find,
    create,
    remove
}