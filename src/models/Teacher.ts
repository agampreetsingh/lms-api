import Sequelize from 'sequelize';
import { db } from '../db'
import { Teacher } from '../interfaces/Teacher'
import { Subjects } from './Subject'

export const Teachers = db.define<Teacher, any>('teacher', {
    teacherName: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Teachers.belongsTo(Subjects, { foreignKey: 'sid' })