import express, { Router, Request } from 'express'
import { Courses } from '../../db'
import { Batches } from '../../db'
import { Lectures } from '../../db'
import { Teachers } from '../../db'
import { Students } from '../../db'
import { Batch } from '../../interfaces/Batch';

export const courses: Router = Router();

courses.get('/', (req, res) => {
    return Courses.findAll({
        attributes: ['id', 'name']
    })
        .then((allCourses) => {
            res.status(200).send(allCourses);
        })
        .catch((err) => {
            res.status(500).send({
                 err
            })
        })
});

courses.post('/', (request, response) => {
    if(!request.body.name)
      return response.status(400).send("Course Name not Found");
    Courses.create({
        name: request.body.name
    })
    .then((course) => {
        response.status(200).send(course);
    
    })
    
});

courses.get('/:id', (req, res) => {
    return Courses.findOne({
        attributes: ['id', 'name'],
        where: { id: [req.params.id] }
    })
        .then((course) => {
            res.status(200).send(course);
        })
        .catch((err) => {
            res.status(500).send({
                err
            })
        })
});

courses.get('/:id/batches', (req, res) => {   
    Courses.findOne({
        where: {
            id: req.params.id
        }
    })
    .then((course) => {
        course.getBatches().then((batches) => res.send(batches))
    })
});

courses.post('/:id/batches', (request, response) => {
    if(isNaN(parseInt(request.params.id)))
      return response.status(400).send("Course is invalid")     
    Courses.findOne({
        where: {
            id: request.params.id
        }
    })
    .then((course) => {     
      Batches.create({ name: request.body.name }).then((batch) => {
        course.addBatches(batch).then((ans) => response.send(ans))   
     });       
    })
})

courses.get('/:courseId/batches/:batchId', (req, res) => {
   
    Courses.findOne({
        where: {
            id: req.params.courseId
        }
    })
    .then((course) => {
       course.getBatches().then((batchArray) => {
          for(let obj of batchArray) {
              if(obj.CourseBatch.batchId == req.params.batchId)
                 return res.send(obj)
          }
          res.send("No batch found")
       })
    })
});

courses.get('/:id/batches/:bid/lectures', (req, res) => {    
 
    Courses.findOne({where: {id: req.params.id}})
           .then((course) => {
               if(!course)
                  return res.send("No course and lecture found")
               course.getBatches()
                     .then((batchArray) => {
                        if(!batchArray)
                          return res.send("No such record exists")
                        let exist: boolean = false;
                        for(let obj of batchArray) {                           
                            if(obj.CourseBatch.batchId == req.params.bid) {                               
                                exist = true;
                                Lectures.findAll({
                                    where: {
                                        batchId: req.params.bid
                                    }
                                })
                                .then(lectures => {
                                    return res.send(lectures)
                                })
                            }                              
                        }
                        if(!exist)
                          res.send('No Lecture Found')
                     })
           })   
});


courses.get('/:id/batches/:bid/lectures/:lid', (req, res) => {
    
      Lectures.findOne({
          where: {
              id: req.params.lid,
              batchId: req.params.bid
          }
      })
        .then((lectures) => {
            res.status(200).send(lectures);
        })
        .catch((err) => {
            res.status(500).send({
                err
            })
        })
});

courses.post('/:courseId/batches/:batchId/lectures', (request, response) => {
    Courses.findOne({where: {id: request.params.courseId}}).then((course) => {
        if(!course)  return response.send("No course Found")
        course.getBatches().then((batches) => {
            if(!batches)  return response.send("No Batch Found")
            Lectures.create({
                name: request.body.name,
                batchId: request.params.batchId
            })
            .then((lecture) => response.send(lecture))
        })
    })
})

courses.get('/:id/batches/:bid/teachers', (req, res) => {
    return Lectures.findAll({
        attributes: ['id'],
        include: [{
            model: Batches,
            attributes: ['batchName'],

            include: [{
                model: Courses,
                attributes: ['courseName'],
                required: true
            }],

            where: {
                cid: [req.params.id],
                id: [req.params.bid]
            }
        },
        {
            model: Teachers,
            attributes: ['teacherName']
        }],
        group: ['tid']
    })
        .then((lectures) => {
            res.status(200).send(lectures);
        })
        .catch((err) => {
            res.status(500).send({
                 err
            })
        })
});

courses.get('/:id/batches/:bid/students', (req, res) => {
   
    Courses.findOne({
        where: {
            id: req.params.id
        }
    })
    .then((course) => {
        if(!course)
          return res.json("No course Found")
          Batches.findOne({
            where: {
                id: req.params.bid
            }
        })
        .then((batch) => {
            if(!batch) 
               return res.json("No Batch Found");
            batch.getStudents().then((students) => res.send(students))
        })
    })
    
});


courses.post('/', (req, res) => {
    return Courses.create({
        courseName: req.body.courseName,
    })
        .then((course) => {
            res.status(200).send(course);
        })
    
})


courses.delete('/:id', (req, res) => {
    return Courses.destroy({
        where: { id: [req.params.id] }
    })
        .catch((err) => {
            res.status(500).send("Unable to delete")
        })
})