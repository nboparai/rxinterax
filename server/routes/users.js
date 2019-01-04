const express = require('express')
const router = express.Router()
const User = require('../database/models/User')
const passport = require('../passport')

router.post('/', (req, res) => {
    console.log('user signup');

    const { firstname, lastname, email, password } = req.body
    // ADD VALIDATION
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        console.log('User.js post error: ', err)
      } else if (user) {
        res.json({
            error: `Sorry, already a user with the email: ${email}`
        })
        console.log(`Sorry, already a user with the email: ${email}`)
      }
      else {
        const newUser = new User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        })
        newUser.save((err, savedUser) => {
            if (err) return res.json(err)
            res.json(savedUser)
        })
      }
    })
})

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        // console.log(req.user)
        next()
    // =========================================
    // NOT REACHING AUTHENTICATION
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
          email: req.user.email
        };
        res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router;