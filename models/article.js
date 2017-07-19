// Require Mongoose
var mongoose = require('mongoose');

// Create a Schema Class
var Schema = mongoose.Schema;

// Create Article Schema
var ArticleSchema = new Schema({

  // Title of Article
  title: {
    type: String,
    required: true
  },
  // Link to Article
  link: {
    type: String,
    required: true
  },
  // Summary of Article
  summary: {
    type: String,
    required: true
  },
  updated: {
    type: Date,
    default: Date.now
  },
  // Connect to comment.js
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

// Create the Article model with Mongoose
var article = mongoose.model('Article', ArticleSchema);

// Export the Model
module.exports = article;