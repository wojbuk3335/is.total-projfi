const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { validateEmail } = require('../validators');
const randomstring = require("randomstring");
const argon2 = require('argon2');

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email jest wymagany'],
    lowercase: true,
    trim: true,
    unique: true,
    validate: [validateEmail, 'Email nieprawidłowy']
  },
  password: {
    type: String,
    required: true,
    minLength: [4, 'Hasło powinno posiadać min. 4 znaki']
  },
  firstName: String,
  lastName: String,
  apiToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.post('save', function(error, doc, next) {
  if (error.code === 11000) {
    error.errors = { email: { message: 'Email jest już zajęty' }};
  }
  next(error);
});

userSchema.pre('save', async function(next) {
  const user = this;
  // Only hash the password if it has been modified (or is new)
  if (user.isModified('password') || user.isNew) {
    try {
      user.password = await argon2.hash(user.password);
    } catch (err) {
      return next(err);
    }
  }
  // Handle apiToken generation for new users
  if (user.isNew) {
    user.apiToken = randomstring.generate(30);
  }
  next();
});

userSchema.methods = {
  async comparePassword(password) {
    try {
      return await argon2.verify(this.password, password);
    } catch (err) {
      throw new Error('Password comparison failed');
    }
  },
  async generatePasswordResetToken() {
    const plainResetToken = randomstring.generate(30);
    this.passwordResetToken = await argon2.hash(plainResetToken);
    this.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await this.save({ validateBeforeSave: false });
    return plainResetToken;
  },
  async resetPassword(newPassword) {
    this.password = newPassword;
    this.passwordResetToken = undefined;
    this.passwordResetExpires = undefined;
    await this.save({ validateBeforeSave: false });
  }
};

userSchema.virtual('fullName').get(function() {
  return `${this.firstName || ''} ${this.lastName && this.lastName[0] || ''}.`;
});

const User = mongoose.model('User', userSchema);

module.exports = User;