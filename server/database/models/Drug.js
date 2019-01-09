const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
const DrugSchema = new Schema({
  // `medname` is of type String
  medname: {type: String, required: true},
  // `strength` is of type String
  strength: {type: String, required: false},
 // `dosage` is of type String
  dosage: {type: String, required: false},
  //drug id from database
  rxcui: {type: String, required: false}

});

// This creates our model from the above schema, using mongoose's model method
const Drug = mongoose.model("Drug", DrugSchema);

// Export the Note model
module.exports = Drug;