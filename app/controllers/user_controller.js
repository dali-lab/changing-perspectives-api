// user_controller.js

import jwt from 'jwt-simple';
import UserModel from '../models/user_model';
import dotenv from 'dotenv';
dotenv.config({ silent: true });

const generateUsername = (name) => {
  const firstName = (name.firstName) ? name.firstName : name.split(' ')[0];
  const lastName = (name.lastName) ? name.lastName : name.split(' ')[1];
  const usernameText = firstName.charAt(0) + lastName;
  const val = Math.floor(100 + Math.random() * 900);
  return usernameText.toLowerCase().concat(val.toString());
};

const generatePassword = () => {
  const randomPasswords = ['gateway', 'alliance', 'elephant', 'liberty', 'astronaut',
  'tricycle', 'potential', 'population', 'guidebook', 'companion', 'generation', 'discussion',
   'quotation', 'adjective', 'dialogue', 'compassion', 'empathetic', 'amusement', 'serenity'];
  const randomIndex = Math.floor(Math.random() * randomPasswords.length);
  const currentPassword = randomPasswords[randomIndex];
  const passwordVal = Math.floor(10 + Math.random() * 90);
  return currentPassword.concat(passwordVal.toString());
};


function formatUserForResponse(user) {
  console.log(user);
  console.log(user.populate());
  const userData = { user: user.username, role: user.role, activities: user.activities, firstName: user.firstName, lastName: user.lastName, gradeLevels: user.gradeLevels, categories: user.categories, students: user.students, teacher: user.teacher, expirationDate: user.expirationDate };
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
  const password = req.body.password || generatePassword();
  const username = req.body.username || generateUsername({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

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

const createClassroomStudents = (req, res) => {
  const nameList = req.body.students;
  for (let i = 0; i < nameList.length; i += 1) {
    const currentName = nameList[i].split(' ');
    signup({
      body: {
        firstName: currentName[0],
        lastName: currentName[1],
        role: 3,
      },
    }, res);
  }
};


// TODO: add functionality for a teacher to only get relevant students
// TODO: add functionality to fill in activities, gradeLevels, and categories
export const getUsers = (req, res) => {
// get should return only the user that is logged in right now
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
