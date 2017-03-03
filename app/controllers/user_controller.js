// user_controller.js

import jwt from 'jwt-simple';
import UserModel from '../models/user_model';
import dotenv from 'dotenv';
dotenv.config({ silent: true });

function formatUserForResponse(user) {
  console.log(user);
  console.log(user.populate());
  // const userData = {user.username, user.role, user.activities, user.firstName, user.lastName, user.gradeLevels, user.categories, user.students, user.teacher, user.expirationDate};
  return userData;
}

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.API_SECRET);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const password = req.body.password;
  const username = req.body.username;

  if (!username || !password) {
    res.status(422).send('You must provide email and password');
  }

  UserModel.findOne({ username })
  .then(user => {
    if (user) {
      res.status(422).send('User already exists');
    }
  });
  const user = new UserModel({ ...req.body });

  console.log(req.body, user);
  console.log({ ...req.body });
  user.save()
    .then(result => {
      // const userData = { ...result };
      // userData.password = null;
      res.json({ message: 'User created!', user: formatUserForResponse(result) });
    })
    .catch(error => {
      res.json({ error });
    });
};


// TODO: add functionality for a teacher to only get relevant students
// TODO: add functionality to fill in activities, gradeLevels, and categories
export const getUsers = (req, res) => {
  UserModel.find()
    .then(result => {
      res.json({ message: 'All users returned!', users: result });
    })
    .catch(error => {
      res.json({ error });
    });
};

// TODO: add functionality to fill in activities, gradeLevels, and categories
export const getUser = (req, res) => {
  UserModel.findById(req.params.id)
    .then(result => {
      res.json({ message: 'Single User found!', user: result });
    })
    .catch(error => {
      res.json({ error });
    });
};

export const deleteUser = (req, res) => {
  UserModel.remove({ _id: req.params.id })
    .then(result => {
      res.json({ message: 'User Removed!', result });
    })
    .catch(error => {
      res.json({ error });
    });
};


export const updateUser = (req, res) => {
  UserModel.update({ _id: req.params.id }, req.body)
    .then(result => {
      res.json({ message: 'User Updated!', user: result });
    })
    .catch(error => {
      res.json({ error });
    });
};
