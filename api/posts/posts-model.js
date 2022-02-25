const db = require('../../data/db-config')

function find(){
    return db('posts')
}

module.exports = {
    find,
}