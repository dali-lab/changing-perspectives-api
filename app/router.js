// router.js

import { Router } from 'express';
import * as Users from './controllers/user_controller';
import * as Activities from './controllers/activity_controller';
import * as Categories from './controllers/categoryController';

const router = new Router();

router.route('/users')
  .get((req, res) => {
    Users.getUsers(req, res);
  })
  .post((req, res) => {
    Users.createUser(req, res);
  });

router.route('/users/:id')
  .get((req, res) => {
    Users.getUser(req, res);
  })
  .put((req, res) => {
    Users.updateUser(req, res);
  })
  .delete((req, res) => {
    Users.deleteUser(req, res);
  });

router.route('/activities')
  .get((req, res) => {
    Activities.getActivities(req, res);
  })
  .post((req, res) => {
    Activities.createActivity(req, res);
  });

router.route('/activities/:id')
  .get((req, res) => {
    Activities.getActivity(req, res);
  })
  .put((req, res) => {
    Activities.updateActivity(req, res);
  })
  .delete((req, res) => {
    Activities.deleteActivity(req, res);
  });

router.route('/categories')
    .get((req, res) => {
      Categories.getCategories(req, res);
    })
    .post((req, res) => {
      Categories.createCategory(req, res);
    });

router.route('/categories/:id')
      .get((req, res) => {
        Categories.getCategory(req, res);
      })
      .put((req, res) => {
        Categories.updateCategory(req, res);
      })
      .delete((req, res) => {
        Categories.deleteCategory(req, res);
      });

export default router;
