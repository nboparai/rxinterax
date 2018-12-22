// Import `User` model object
const db = require('./../models/User');

// https://medium.com/@Keithweaver_/building-a-log-in-system-for-a-mern-stack-39411e9513bd

module.exports = {
   // Signup api endpoint
   create: function(req, res) { 
      db.User
         .create(req.body)
         .then(dbUserModel => res.json(dbUserModel))
         .catch(err => res.status(422).json(err));
   }


   //    .post('/api/account/signup', (req, res, next) => {
   //          // Store request object
   //          const { body } = req;
   //          // Get username, email, & password from request body
   //          const { password } = body;
   //          let { email } = body;
   //          let { username } = body;

   //          // Validation: ensure username, email, & password are proper values
   //          if (!username) {
   //             return res.send({
   //                success: false,
   //                message: 'Error: Username cannot be blank.'
   //             });
   //          }
   //          if (!email) {
   //             return res.send({
   //                success: false,
   //                message: 'Error: Email cannot be blank.'
   //             });
   //          }
   //          if (!password) {
   //             return res.send({
   //                success: false,
   //                message: 'Error: Password cannot be blank.'
   //             });
   //          }

   //          email = email.toLowerCase().trim();

   //          // Verify email does not already exist
   //          // If existing user with that email, return error message
   //          db.User.find({
   //             email: email
   //          }, (err, previousUser) => {
   //             if (err) {
   //                return res.send({
   //                   success: false,
   //                   message: 'Error: Server error'
   //                });
   //             } else if (previousUser.length > 0) {
   //                return res.send({
   //                   success: false,
   //                   message: 'Error: Account already exists'
   //                });
   //             }

   //             // Create new user object & save
   //             const newUser = new User();

   //             newUser.username = username;
   //             newUser.email = email;
   //             newUser.password = newUser.generateHash(password);
   //             newUser.save((err, user) => {
   //                if (err) {
   //                   return res.send({
   //                      success: false,
   //                      message: 'Error: Server error'
   //                   });
   //                }
   //                return res.send({
   //                   success: true,
   //                   message: 'Your account has been created!'
   //                });
   //             });
   //          });
   //       })   // End of signup endpoint
   //       .catch(err => res.status(422).json(err));
   // }
};