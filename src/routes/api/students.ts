import express, { Router, Request } from 'express'
import { Students } from '../../models/Student'
import { Batches } from '../../models/Batch'
import {} from '../../models/';

export const students: Router = Router();

students.get('/', (req, res) => {
    return Students.findAll({
        attributes: ['id', 'studentRoll', 'studentName']
    })
        .then((allStudents) => {
            res.status(200).send(allStudents);
        })
        .catch((err) => {
            res.status(500).send("No student found")
        })
});

students.post('/', (request, response) => {    
    Students.create({
      studentRoll: request.body.roll,
      studentName: request.body.name
    })
    .then((student) => response.status(200).send(student))
    .catch((error) => response.status(400).send("Cannot Add"))
})

students.get('/:id', (req, res) => {
    return Students.find({
        attributes: ['id', 'studentRoll', 'studentName'],
        where: { id: [req.params.id] }
    })
        .then((student) => {
            res.status(200).send(student);
        })
        .catch((err) => {
            res.status(500).send("No student found")
        })
});

students.get('/:id/batches', (req, res) => {
    return Batches.findAll({
        attributes: ['batchName'],
        include: [{
            model: Students,
            attributes: ['studentName'],
            where: { id: [req.params.id] }
        }],
    })
        .then((batches) => {
            res.status(200).send(batches);
        })
        .catch((err) => {
            res.status(500).send("No student found")
        })
});

