import Sequelize from 'sequelize';
import { db } from '../db'
import { Course } from '../interfaces/Course'

export const Courses = db.define<Course, any>('course', {
    courseName: {
        type: Sequelize.STRING,
        allowNull: false
    }
})