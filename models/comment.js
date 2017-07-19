// Require Mongoose
var mongoose = require('mongoose');

// Create a Schema Class
var Schema = mongoose.Schema;

// Create Comment Schema
var CommentSchema = new Schema({

  // Author's Name
  author: {
    type: String
  },
  // Comment Content
  content: {
    type: String
  }
  
});


// comment model
var comment = mongoose.model('Comment', CommentSchema);

// Export comment to server
module.exports = comment;