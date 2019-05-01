const express = require('express')
const router = express.Router()
const { User } = require('../models/User')
const { authenticateUser } = require('../../app/middlewares/authentication')
const _ = require('lodash')


router.post('/register', function (req, res) {
    //const body = req.body
    let body = _.pick(req.body,['username','email','password','Group'])
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

router.post('/isadmin',function (req, res) {
    const body = _.pick(req.body,['email'])
    email= body.email
    User.findOne({ email })
        .then(function (user) {
            if (user.roles.includes('admin')) {
                res.send ({ 
                    id: user.id,
                    isadmin : true
                })
            }
            else{
                res.send(
                    {
                    id: user.id,
                    isadmin: false
                    })
            }
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
