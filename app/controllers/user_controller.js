// user_controller.js

import jwt from 'jwt-simple';
import UserModel from '../models/user_model';
import dotenv from 'dotenv';
dotenv.config({ silent: true });

const generateUsername = (name) => {
  const firstName = name.firstName;
  const lastName = name.lastName;
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
  const userData = user.populate();
  userData.password = '';
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

  const user = new UserModel({ ...req.body });
  user.save()
    .then(result => {
      res.json({ message: 'User created!', user: formatUserForResponse(result) });
    })
    .catch(error => {
      if (error.code === 11000) {
        // find all usernames that have the same starting characters
        const usernameText = user.firstName.charAt(0) + user.lastName;
        const regex = new RegExp(`^${usernameText.toLowerCase()}.*`, 'i');
        console.log(regex);
        UserModel.find({ username: regex })
          .then(userList => {
            console.log(userList);
            const userNames = userList.map(u => { return u.username; });
            let newUsername = generateUsername(user);
            while (userNames.indexOf(newUsername) >= 0) {
              newUsername = generateUsername(user);
            }
            user.username = newUsername;
            user.save()
              .then(result => {
                res.json({ message: 'User created!', user: formatUserForResponse(result) });
              })
              .catch(err => {
                res.json({ err });
              });
          })
          .catch(err => {
            res.json({ err });
          });
      }
    });
};

export const createClassroomStudents = (body, classroom) => {
  const nameList = body.students;
  for (let i = 0; i < nameList.length; i += 1) {
    const currentName = nameList[i].split(' ');
    const firstName = currentName[0];
    const lastName = currentName[1];
    const username = generateUsername({ firstName, lastName });
    const password = generatePassword();
    const user = new UserModel({
      role: 3,
      studentClassroom: classroom.id,
      firstName, lastName, username, password,
    });
    user.save()
      .then(result => {
        classroom.students.push(result);
        if (classroom.students.length === nameList.length) {
          classroom.save((r) => {
            console.log('classroom updated with students, result: ', r);
          });
        }
      })
      .catch(error => {
        if (error.code === 11000) {
          // find all usernames that have the same starting characters
          const usernameText = user.firstName.charAt(0) + user.lastName;
          const regex = new RegExp(`^${usernameText.toLowerCase()}.*`, 'i');
          UserModel.find({ username: regex })
            .then(userList => {
              const userNames = userList.map(u => { return u.username; });
              let newUsername = generateUsername(user);
              while (userNames.indexOf(newUsername) >= 0) {
                newUsername = generateUsername(user);
              }
              user.username = newUsername;
              user.save()
                .then(result => {
                  console.log('student created: ', result);
                  classroom.students.push(result);
                  if (classroom.students.length === nameList.length) {
                    classroom.save((r) => {
                      console.log('classroom updated with student, result: ', r);
                    });
                  }
                });
            });
        }
      });
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
