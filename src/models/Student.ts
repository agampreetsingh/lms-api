import Sequelize from 'sequelize';
import { db } from '../db'
import { Student } from '../interfaces/Student'
import { Batches } from './Batch'

export const Students = db.define<Student, any>('student', {
    studentRoll: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    studentName: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


