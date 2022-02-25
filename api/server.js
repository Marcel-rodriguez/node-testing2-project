const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

const postRouter = require('./posts/posts-router')
const userRouter = require('./users/user-router')

const server = express()

server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(morgan('dev'))


server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        custom: 'The gods are mad check why...',
        message: err.message,
        stack: err.stack
    })
})

module.exports = server