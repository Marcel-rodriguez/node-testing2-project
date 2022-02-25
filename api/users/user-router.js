const express = require('express')
const router = express.Router()

const userModel = require('./user-model')


router.get('/', (req, res, next) => {
    res.json({message: 'users router'})
})

module.exports = router