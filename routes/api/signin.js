// Import `User` model object
const User = require('../../models/User');

// https://medium.com/@Keithweaver_/building-a-log-in-system-for-a-mern-stack-39411e9513bd

module.exports = (app) => {
   // Signup api endpoint
   app.post('/api/account/signup', (req, res, next) => {
      // Store request object
      const { body } = req;
      // Get email & password from request body
      const { password } = body;
      let { email } = body;

      // Validation: ensure both email & password are proper values
      if (!email) {
         return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
         });
      }
      if (!password) {
         return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
         });
      }

      email = email.toLowerCase().trim();

      // Verify email does not already exist
      // If existing user with that email, return error message
      User.find({
         email: email
      }, (err, previousUser) => {
         if (err) {
            return res.send({
               success: false,
               message: 'Error: Server error'
            });
         } else if (previousUser.length > 0) {
            return res.send({
               success: false,
               message: 'Error: Account already exists'
            });
         }

         // Create new user object & save
         const newUser = new User();

         newUser.email = email;
         newUser.password = newUser.generateHash(password);
         newUser.save((err, user) => {
            if (err) {
               return res.send({
                  success: false,
                  message: 'Error: Server error'
               });
            }
            return res.send({
               success: true,
               message: 'Your account has been created!'
            });
         });
      });
   });   // End of signup endpoint
};