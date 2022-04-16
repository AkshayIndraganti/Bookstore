const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please Enter An Name'],
    minlength: [6, 'Minimum name Length Should  Be  6 Character'],
  },
  email: {
    type: String,
    required: [true, 'Please Enter An Email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please Enter a valid Email'],
  },
  password: {
    type: String,
    required: [true, 'Please Enter An Password'],
    minlength: [6, 'Minimum Password Length Should  Be  6 Character'],
  },
  bookstores: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Bookstore',
    },
  ],
});

//fire a fuction after doc saved to db
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//login
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const User = mongoose.model('User', userSchema);

module.exports = User;
