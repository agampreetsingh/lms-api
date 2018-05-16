import express, { Router, Request } from 'express'
import { Subjects } from '../../db'
import { Teachers } from '../../db'

export const subjects: Router = Router();

subjects.get('/', (req, res) => {
    return Subjects.findAll({
        attributes: ['id', 'name']
    })
        .then((allSubjects) => {
            res.status(200).send(allSubjects);
        })
        .catch((err) => {
            res.status(500).send({
               err
            })
        })
});

subjects.post('/', (request, response) => {
    Subjects.create({
        name: request.body.name       
    })
    .then((subject) => response.status(200).send(subject))
    .catch((error) => response.send(error))
});

subjects.get('/:id', (req, res) => {
    return Subjects.find({
        attributes: ['id', 'name'],
        where: { id: [req.params.id] }
    })
        .then((subject) => {
            res.status(200).send(subject);
        })
        .catch((err) => {
            res.status(500).send({
              err
            })
        })
});

subjects.get('/:id/teachers', (req, res) => {   
    Subjects.findOne({
        where: {
            id: req.params.id
        }
    })
    .then((subject) => {
        subject.getTeachers().then((teachers) => res.send(teachers))
    })
});
