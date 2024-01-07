import mongoose from 'mongoose';

const Schema = mongoose.Schema,
  bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;

const UserSchema = new Schema(
  {
    //Our password is hashed with bcrypt
    password: { type: String, required: true },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      unique: true,
      index: true,
    },
    profile: {
      firstName: String,
      lastName: String,
    },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
  next();
});

UserSchema.post('save', function (error, doc, next) {
  if (error.code === 11000) {
    next(new Error(`${doc.email} is already taken!`));
  } else {
    next(error);
  }
});

UserSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

export default mongoose.model('User', UserSchema);
