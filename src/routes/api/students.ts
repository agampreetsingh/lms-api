import express, { Router, Request } from 'express'
import { Students } from '../../db'
import { Batches } from '../../db'


export const students: Router = Router();

students.get('/', (req, res) => {
    return Students.findAll({
        attributes: ['id', 'name']
    })
        .then((allStudents) => {
            res.status(200).send(allStudents);
        })
        .catch((err) => {
            res.status(500).send({
               err
            })
        })
});

students.post('/', (request, response) => {    
    Students.create({     
      name: request.body.name
    })
    .then((student) => response.status(200).send(student))
    .catch((error) => response.status(400).send(error))
})

students.get('/:id', (req, res) => {
    return Students.find({
        attributes: ['id', 'name'],
        where: { id: [req.params.id] }
    })
        .then((student) => {
            res.status(200).send(student);
        })
        .catch((err) => {
            res.status(500).send({
               err
            })
        })
});

students.get('/:id/batches', (req, res) => {   
    Students.findOne({
        where: {
            id: req.params.id
        }
    })
    .then((student) => {
        student.getBatches().then((batches) => res.send(batches))
    })
});



