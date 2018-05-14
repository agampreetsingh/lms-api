import Sequelize from 'sequelize';
import { db } from '../db'
import { Subject } from '../interfaces/Subject'
import { Courses } from './Course'

export const Subjects = db.define<Subject, any>('subject', {
    subjectName: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Subjects.belongsTo(Courses, { foreignKey: 'cid' })