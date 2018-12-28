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

  findById: function(req, res) {
    console.log(req.body);
      db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
