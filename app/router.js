// router.js

import { Router } from 'express';
import * as Users from './controllers/user_controller';
import * as Activities from './controllers/activity_controller';
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

export default router;
