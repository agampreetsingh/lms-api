import express, { Router, Request } from 'express'
import { Batches } from '../../db'
import { Lectures } from '../../db'
import { Teachers } from '../../db'

export const teachers: Router = Router();

teachers.get('/', (req, res) => {
    return Teachers.findAll({
        attributes: ['id', 'name']
    })
        .then((allTeachers) => {
            res.status(200).send(allTeachers);
        })
        .catch((err) => {
            res.status(500).send("No Teachers Found")
        })
});

teachers.post('/', (request, response) => {
    Teachers.create({
        name: request.body.name,
        subjectId: request.body.subjectId
    })
    .then((teacher) => response.status(200).send(teacher))
    .catch((error) => response.send(error))
})

teachers.get('/:id', (req, res) => {
    return Teachers.find({
        attributes: ['id', 'name'],
        where: { id: [req.params.id] }
    })
        .then((teacher) => {
            res.status(200).send(teacher);
        })
        .catch((err) => {
            res.status(500).send({
               err
            })
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
            res.status(500).send({
                 err
            })
        })
});