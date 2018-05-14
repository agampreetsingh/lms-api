import express, { Router, Request } from 'express'
import { Batches } from '../../models/Batch'
import { Lectures } from '../../models/Lecture'
import { Teachers } from '../../models/Teacher'

export const teachers: Router = Router();

teachers.get('/', (req, res) => {
    return Teachers.findAll({
        attributes: ['id', 'teacherName']
    })
        .then((allTeachers) => {
            res.status(200).send(allTeachers);
        })
        .catch((err) => {
            res.status(500).send("Teacher not found")
        })
});

teachers.post('/', (request, response) => {
    Teachers.create({
        teacherName: request.body.name,
        sid: request.body.subjectId
    })
    .then((teacher) => response.status(200).send(teacher))
    .catch((error) => response.send("Cannot add teacher"))
})

teachers.get('/:id', (req, res) => {
    return Teachers.find({
        attributes: ['id', 'teacherName'],
        where: { id: [req.params.id] }
    })
        .then((teacher) => {
            res.status(200).send(teacher);
        })
        .catch((err) => {
            res.status(500).send("Cannot get teacher")
        })
});

teachers.get('/:id/batches', (req, res) => {
    return Lectures.findAll({
        attributes: ['bid'],
        include: [{
            model: Batches,
            attributes: ['batchName']
        }],
        where: { tid: [req.params.id] },
        group: ['bid']
    })
        .then((batches) => {
            res.status(200).send(batches);
        })
        .catch((err) => {
            res.status(500).send("No batch found")
        })
});