const db = require("../database/models");

module.exports = {
findAll: function(req, res) {
    db.User
        .find(req.query)
        .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
create: function(req, res) {

    db.Drug
        .create(req.body)
        .then(dbDrug => {
            return db.User.findOneAndUpdate({_id:req.params.id}, { $push: { drugs: dbDrug._id } }, { new: true })
        })
        .then(dbUserMeds => res.json(dbUserMeds))
        
        .catch(err => res.status(422).json(err))
        
    }
}