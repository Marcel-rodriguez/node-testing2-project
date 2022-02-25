const express = require('express')
const router = express.Router()

const postModel = require('./posts-model')


router.get('/', (req, res, next) => {
    res.json({message: 'posts router'})
})

module.exports = router