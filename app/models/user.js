var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  name: String,
  username: {type: String, required: true, index: {unique: true}},
  username: {type: String, required: true, select: false}
});

UserSchema.pre('save', function (next) {
  // body...
  var user = this;
  if (!user.isModified('password'))
    return next();

  bcrypt.hash(user.password, null, null, function (err, hash) {
    // body...
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password) {
  // body...
  var user = this;
  return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', UserSchema);
