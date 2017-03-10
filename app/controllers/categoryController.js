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

export const autoLoadCategories = (req, res) => {
  CategoryModel.find().count().then((result) => {
    if (result === 24) {
      res.json({ message: 'Categories already exist' });
    } else {
      const categoryNames = ['Autism', 'Hearing Loss', 'Blindness',
        'Learning Disability', 'Physical Disability', 'Social Disability',
        'Language', 'Cognitive Delays'];
      const gradeLevels = [1, 2, 3];
      const categoryUrls = ['autism', 'hearing', 'blindness', 'learning',
        'physical', 'social', 'language', 'cognitive'];
      const categories = [];
      for (let i = 0; i < categoryNames.length; i += 1) {
        for (let j = 0; j < gradeLevels.length; j += 1) {
          const category = {
            name: categoryNames[i],
            gradeLevel: gradeLevels[j],
            url: categoryUrls[i],
          };
          categories.push(category);
        }
      }
      CategoryModel.create(categories).then(r => {
        res.json({ message: 'Categories created.', data: r });
      });
    }
  })
  .catch(error => {
    res.json({ error });
  });
};
