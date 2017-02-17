// categoryModel.js

import mongoose, { Schema } from 'mongoose';

// the schema for the category model
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gradeLevel: { // 1: grades K-2, 2: grades 3-5, 3: grades 6-8
    type: Number,
    required: true,
  },
  url: String,  // how the category name will show up in the URL
  img: String, // url to the image
});

// create model class
const categoryModel = mongoose.model('Category', categorySchema);

// export model class to use in other files
export default categoryModel;
