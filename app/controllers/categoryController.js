// categoryController.js

import CategoryModel from '../models/categoryModel';

export const createCategory = (req, res) => {
  const category = new CategoryModel();
  category.name = req.body.name;
  category.url = req.body.url;
  category.gradeLevel = req.body.gradeLevel;
  category.img = req.body.img;
  category.save()
    .then(result => {
      res.json({ message: 'category created!', category });
    })
    .catch(error => {
      res.json({ error });
    });
};

// TODO: add functionality to query for categories by level or name
export const getCategories = (req, res) => {
  CategoryModel.find()
    .then(result => {
      res.json({ message: 'All categories returned!', categories: result });
    })
    .catch(error => {
      res.json({ error });
    });
};

export const getCategory = (req, res) => {
  CategoryModel.findById(req.params.id)
    .then(result => {
      res.json({ message: 'Single Category found!', category: result });
    })
    .catch(error => {
      res.json({ error });
    });
};

export const deleteCategory = (req, res) => {
  CategoryModel.remove({ _id: req.params.id })
    .then(result => {
      res.json({ message: 'Category Removed!', category: result });
    })
    .catch(error => {
      res.json({ error });
    });
};

export const updateCategory = (req, res) => {
  CategoryModel.update({ _id: req.params.id }, req.body)
    .then(result => {
      res.json({ message: 'Category Updated!', category: result });
    })
    .catch(error => {
      res.json({ error });
    });
};
