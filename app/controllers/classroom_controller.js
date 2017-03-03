// classroom_controller.js

import ClassroomModel from '../models/classroom_model';

export const createClassroom = (req, res) => {
  const classroom = new ClassroomModel();
  classroom.name = req.body.name;
  classroom.imageUrl = req.body.imageUrl;
  classroom.students = req.body.students;
  classroom.teacher = req.body.teacher;
  classroom.expirationDate = req.body.expirationDate;
  classroom.save()
    .then(result => {
      res.json({ message: 'Classroom created!', classroom: result });
    })
    .catch(error => {
      res.json({ error });
    });
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

export const createClassroomStudents = (req, res) => {
  signup();
  const randomPasswords = ['gateway', 'alliance', 'elephant', 'liberty', 'astronaut',
  'tricycle', 'potential', 'population', 'guidebook', 'companion', 'generation', 'discussion',
   'quotation', 'adjective', 'dialogue', 'compassion', 'empathetic', 'amusement', 'serenity'];
  const usernameInitials = req.body.firstName.charAt(0) + req.body.lastName.charAt(0);
  const val = Math.floor(100 + Math.random() * 900);
  const generatedUsername = usernameInitials.toLowerCase() + val.toString();
};

// TODO: add functionality to only get teacher-specific classrooms
export const getClassrooms = (req, res) => {
  ClassroomModel.find()
    .then(result => {
      res.json({ message: 'All classrooms returned!', classrooms: result });
    })
    .catch(error => {
      res.json({ error });
    });
};

export const getClassroom = (req, res) => {
  ClassroomModel.findById(req.params.id)
    .then(result => {
      res.json({ message: 'Single Classroom found!', classroom: result });
    })
    .catch(error => {
      res.json({ error });
    });
};

export const deleteClassroom = (req, res) => {
  ClassroomModel.remove({ _id: req.params.id })
    .then(result => {
      res.json({ message: 'Classroom Removed!', classroom: result });
    })
    .catch(error => {
      res.json({ error });
    });
};

export const updateClassroom = (req, res) => {
  ClassroomModel.update({ _id: req.params.id }, req.body)
    .then(result => {
      res.json({ message: 'Classroom Updated!', classroom: result });
    })
    .catch(error => {
      res.json({ error });
    });
};
