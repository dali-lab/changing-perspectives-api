// user_model.js

import mongoose, { Schema } from 'mongoose';

// the schema for the user model
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
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
    started_activity: Date,   // date and time when they started activity
    finished_activity: Date,  // date and time when they completed activity
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

// create model class
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
