var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var DrugSchema = new Schema({
  // `name` is of type String
  name: String,
  // `strength` is of type String
  strength: String,
 // `dosage` is of type String
  dosage: String

});

// This creates our model from the above schema, using mongoose's model method
var Drug = mongoose.model("Drug", DrugSchema);

// Export the Note model
module.exports = Drug;