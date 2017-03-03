// classroom_model.js

import mongoose, { Schema } from 'mongoose';

// the schema for the user model
const ClassroomSchema = new Schema({
  name: String,
  imageUrl: String,
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }], // this field will only be used when the user is a teacher
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }, // this field will only be used when the user is a student
  expirationDate: Date,
  // mascot: Number, if we decide to allow users to select their mascot
});

ClassroomSchema.set('toJSON', {
  virtuals: true,
});

// create model class
const ClassroomModel = mongoose.model('Classroom', ClassroomSchema);

export default ClassroomModel;
