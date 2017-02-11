// categoryModel.js

import mongoose, { Schema } from 'mongoose';

// the schema for the category model
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  }, // 1=>autism, 2=>hearing, 3=>visual, 4=>learning, 5=>physical, 6=>social, 7=>speech, 8=>cognitive
  gradeLevel: [Number],
  url: String,  // url where the html for the category can be found
  img: String, // url to the image
});

// create model class
const categoryModel = mongoose.model('Category', categorySchema);

// export model class to use in other files
export default categoryModel;
