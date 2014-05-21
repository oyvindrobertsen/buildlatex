var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  email: String,
  accessToken: String
});

exports.User = mongoose.model('User', userSchema);
