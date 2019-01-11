const db = require("../database/models");

module.exports = {
    findAll: function (req, res) {
        db.User
            .find({ _id: req.params.id }, 'drugs')
            .populate("drugs")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Drug
            .create(req.body)
            .then(dbDrug => {
                res.json(dbDrug);
                return db.User.findOneAndUpdate({ _id: req.params.id }, { $push: { drugs: dbDrug._id } }, { returnOriginal: false })
            })
            // .then(dbUserMeds => res.json(dbUserMeds))
            .catch(err => res.status(422).json(err))
    },
    update: function (req, res) {
        console.log("db update")
        console.log(req.body.rxcui)
        console.log('req params')
        console.log(req.params.id)
        db.Drug
            .update({ _id: req.params.id }, { $set: { rxcui: req.body.rxcui } })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    delete: function (req, res) {
        console.log("deleting");
        console.log(req.params.medname)
        console.log(req.params.userid)
        db.Drug
            .deleteOne({ userid: req.params.userid, medname: req.params.medname })
            .then(dbDrug => {
                console.log(dbDrug)
                res.json(dbDrug)
            })
            .catch(err => res.status(422).json(err));
    }
}