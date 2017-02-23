// user_controller.js

import jwt from 'jwt-simple';
import UserModel from '../models/user_model';
import dotenv from 'dotenv';
dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.API_SECRET);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  if (!email || !password) {
    res.status(422).send('You must provide email and password');
  }

  UserModel.findOne({ email })
  .then(user => {
    if (user) {
      res.status(422).send('User already exists');
    }
  });
  const user = new UserModel();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.username = username;
  user.role = req.body.role;
  user.activities = req.body.activities;
  user.gradeLevels = req.body.gradeLevels;
  user.categories = req.body.categories;
  user.students = req.body.students;
  user.teacher = req.body.teacher;
  user.expirationDate = req.body.expirationDate;
  console.log(req.body, user);
  user.save()
    .then(result => {
      res.json({ message: 'User created!', user: result });
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
