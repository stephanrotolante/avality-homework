const mongoose = require('mongoose');
const User = mongoose.Schema;

const UserSchema= new User({
  firstname:  String, 
  lastname: String,
  number:   String,
  npi: String,
  address: String,
  state: String,
  zip:String,
  email: String
});

export const UserModel =  mongoose.model('User', UserSchema);