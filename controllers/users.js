const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
    try {
        const users = await User.find({}).populate('notes',{content: 1, date: 1})
        res.json(users)
    }catch (e) {
        res.status(400).json({msg:e})
    }
})

userRouter.post('/', async (req, res) => {
    const body = req.body

    const saltRounds = 10 
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })
    const savedUser = await user.save()
    res.json(savedUser)
})

module.exports = userRouter