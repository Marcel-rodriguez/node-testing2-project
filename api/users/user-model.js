const db = require('../../data/db-config')

function find(){
    return db('users')
}

module.exports = {
    find,
}