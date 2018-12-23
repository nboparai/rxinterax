const mongoose = require("mongoose"),
      Schema = mongoose.Schema,
      bcrypt = require("bcrypt"),
      // Purpose of the salt is to defeat rainbow table attacks & resist brute-force attacks
      SALT_WORK_FACTOR = 10;


const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, index: { unique: true } },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // isDeleted: { type: Boolean, default: false },
  date: { type: Date, default: Date.now() }
});  

// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
// ========================================================================================
// Mongoose middleware to automatically hash the password before it's saved to the database
// ========================================================================================
// Mongoose middleware is not invoked on UPDATE() operations, so you must use a SAVE() if 
// you want to update user passwords 

UserSchema.pre('save', function(next) { 
  var user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  
  // Generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
  
    // Hash the password along with our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
  
        // Override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
  });
});

// Password Verification
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;