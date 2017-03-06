// router.js

import { Router } from 'express';
import * as Users from './controllers/user_controller';
import * as Activities from './controllers/activity_controller';
import * as Classrooms from './controllers/classroom_controller';
import * as Categories from './controllers/categoryController';

import { requireAuth, requireSignin } from './services/passport';

const router = new Router();

router.post('/signin', requireSignin, Users.signin);
router.post('/signup', Users.createUser);

router.route('/users')
  .get(requireAuth, Users.getUsers)
  .post(requireAuth, Users.createUser);

router.route('/users/:id')
  .get(requireAuth, Users.getUser)
  .put(requireAuth, Users.updateUser)
  .delete(requireAuth, Users.deleteUser);

router.route('/activities')
  .post(requireAuth, Activities.createActivity)
  .get(requireAuth, Activities.getActivities);

router.route('/activities/:id')
  .get(requireAuth, Activities.getActivity)
  .put(requireAuth, Activities.updateActivity)
  .delete(requireAuth, Activities.deleteActivity);

router.route('/classrooms')
  .get(requireAuth, Classrooms.getClassrooms)
  .post(requireAuth, Classrooms.createClassroom);

router.route('/classrooms/:id')
  .get(requireAuth, Classrooms.getClassroom)
  .put(requireAuth, Classrooms.updateClassroom)
  .delete(requireAuth, Classrooms.deleteClassroom);

router.route('/categories')
    .get(requireAuth, Categories.getCategories)
    .post(requireAuth, Categories.createCategory);

router.route('/categories/:id')
      .get(requireAuth, Categories.getCategory)
      .put(requireAuth, Categories.updateCategory)
      .delete(requireAuth, Categories.deleteCategory);

export default router;
