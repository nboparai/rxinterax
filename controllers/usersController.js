var db = require("../models");

// Defining methods for the usersController
module.exports = {
  createUser: function(req, res) {
    console.log(req.body);
    db.User
    .create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));

  },
  findAll: function(req, res) {
    console.log(req.body);
      db.User
      .find(req.body)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
