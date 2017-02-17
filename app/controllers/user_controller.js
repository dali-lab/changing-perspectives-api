// user_controller.js

import UserModel from '../models/user_model';

// TODO: add functionality to create many users at once
export const createUser = (req, res) => {
  const user = new UserModel();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.username = req.body.username;
  user.password = req.body.password;
  user.role = req.body.role;
  user.activities = req.body.activities;
  user.categories = req.body.categories;
  user.teacher = req.body.teacher;
  user.mascot = req.body.mascot;
  user.teacherClassrooms = req.body.teacherClassrooms;
  user.studentClassroom = req.body.studentClassroom;
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
// TODO: add functionality to fill in activities, classroom, categories data
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
