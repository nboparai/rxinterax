const db = require("../database/models");

// Defining methods for the usersController
module.exports = {
  findAll: function(req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Alex 1/6/19 - Added user id to userInfo object. Passing along to add user id to home url for access later
  authorize: function(req, res) {
      console.log('login authorized', req.user);
      var userInfo = {
          username: req.user.username,
          userid: req.user._id
      };
      res.send(userInfo);
  },
  register: function(req, res) { 
    console.log('user signup');

    const { username, email, password } = req.body
    // ADD VALIDATION
    db.User.findOne({ username: username }, (err, user) => {
      if (err) {
        console.log('User.js post error: ', err)
      } else if (user) {
        res.json({
            error: `Sorry, already a user with the username: ${username}`
        })
      }
      else {
        const newUser = new db.User({
            username: username,
            email: email,
            password: password
        })
        newUser.save((err, savedUser) => {
            if (err) return res.json(err)
            res.json(savedUser)
        })
      }
    })
  },
  logout: function(req, res) {
    if (req.user) {
      req.logout()
      res.send({ msg: 'logging out' })
    } else {
      res.send({ msg: 'no user to log out' })
    }
  }
};