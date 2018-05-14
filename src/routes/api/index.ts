import express, { Router, Request } from 'express';
import { students } from './students'
import { teachers } from './teachers'
import { subjects } from './subjects'
import { courses } from './courses'
export const route: Router = Router()

route.use('/students', students)
route.use('/teachers', teachers)
route.use('/subjects', subjects)
route.use('/courses', courses)
