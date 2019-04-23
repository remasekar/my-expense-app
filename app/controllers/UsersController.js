const express = require('express')
const router = express.Router()
const { User } = require('../models/User')
const { authenticateUser } = require('../../app/middlewares/authentication')
const _ = require('lodash')


router.post('/register', function (req, res) {
    //const body = req.body
    let body = _.pick(req.body,['username','email','password','Group'])
    //console.log(body)
    const user = new User(body)
    user.save()
        .then(function (user) {
            //welcomeMail(req.body.email)
            res.send(user)
        })
        .catch(function (err) {
            res.send(err)
        })
})

// localhost:3000/users/login 
router.post('/login', function (req, res) {
    const body = req.body
    // console.log(body)
    // const login = (Object.values(body)[0])
    // console.log("login",login,)
    // const login = (Object.values(body)[0].indexOf('@') === -1) ? {username: username} : { email : username }
    User.findByCredentials(body.email, body.password)
        .then(function (user) {
            return user.generateToken() 
        })
        .then(function (token) {
            res.send({token})
        })
        .catch(function (err) {
            res.send(err)
        })
})

router.delete('/logout', authenticateUser, function (req, res) {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
        .then(function () {
            res.send({ notice: 'successfully logged out' })
        })
        .catch(function (err) {
            res.send(err)
        })
})

module.exports = { 
    usersRouter: router
}
