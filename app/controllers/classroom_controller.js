// classroom_controller.js

import UserModel from '../models/user_model';
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
