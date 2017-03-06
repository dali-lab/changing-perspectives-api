// user_model.js

import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// the schema for the user model
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: String,
  role: { // the role will be 1 => admin, 2 => teacher, 3 => student
    type: Number,
    required: true,
  },
  activities: [{
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Activity',
    },
    started_activity: Date,   // the date and time when they started the activity
    finished_activity: Date,  // the date & time when they completed the activity
  }],
  firstName: String,
  lastName: String,
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }],
  expirationDate: Date,
  mascot: Number, // if we decide to allow users to select their mascot
  teacherClassrooms: [{
    type: Schema.Types.ObjectId,
    ref: 'Classroom',
  }], // list of a teacher's classrooms
  studentClassroom: {
    type: Schema.Types.ObjectId,
    ref: 'Classroom',
  }, // reference to a student's classroom
});

UserSchema.set('toJSON', {
  virtuals: true,
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }

    return callback(null, isMatch);
  });
};

UserSchema.pre('save', function beforeUserSave(next) {
  const user = this;
  if (user.role === 3) {
    return next();
  }
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  return bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    return bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      return next();
    });
  });
});

// create model class
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
