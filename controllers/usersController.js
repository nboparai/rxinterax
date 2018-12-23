const db = require("../models");

// Defining methods for the usersController
module.exports = {
  findAll: function(req, res) {
    console.log(req.body);
      db.User
      .find(req.body)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
