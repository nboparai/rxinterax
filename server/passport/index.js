const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const User = require('../database/models/User')

// Called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
	console.log('*** SerializeUser called, user: ')
	console.log(user) // entire raw user object
	console.log('----------------------------')
	done(null, { _id: user._id })
})

// User object attaches to the request as req.user
passport.deserializeUser((id, done) => {
	console.log('DeserializeUser called')
	User.findOne(
		{ _id: id },
		'username',
		(err, user) => {
			console.log('*** Deserialize user, user:')
			console.log(user)
			console.log('----------------------------')
			done(null, user)
		}
	)
})

//  Use Strategies 
passport.use(LocalStrategy)

module.exports = passport
