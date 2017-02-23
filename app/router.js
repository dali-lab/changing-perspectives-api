// router.js

import { Router } from 'express';
import * as Users from './controllers/user_controller';
import * as Activities from './controllers/activity_controller';
import * as Classrooms from './controllers/classroom_controller';
import * as Categories from './controllers/categoryController';

import { requireAuth, requireSignin } from './services/passport';

const router = new Router();

router.route('/activities')
  .post(requireAuth, Activities.createActivity)
  .get(Activities.getActivities);

router.route('/activities/:id')
  .get(Activities.getActivity)
  .put(requireAuth, Activities.updateActivity)
  .delete(requireAuth, Activities.deleteActivity);


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

router.post('/signin', requireSignin, Users.signin);
router.post('/signup', Users.signup);

router.route('/classrooms')
  .get((req, res) => {
    Classrooms.getClassrooms(req, res);
  })
  .post((req, res) => {
    Classrooms.createClassroom(req, res);
  });

router.route('/classrooms/:id')
  .get((req, res) => {
    Classrooms.getClassroom(req, res);
  })
  .put((req, res) => {
    Classrooms.updateClassroom(req, res);
  })
  .delete((req, res) => {
    Classrooms.deleteClassroom(req, res);
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
