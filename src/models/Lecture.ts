import Sequelize from 'sequelize';
import { db } from '../db'
import { Lecture } from '../interfaces/Lecture'
import { Batches } from './Batch'
import { Subjects } from './Subject'
import { Teachers } from './Teacher'

export const Lectures = db.define<Lecture, any>('lecture', {

})

Lectures.belongsTo(Batches, { foreignKey: 'bid' })
Lectures.belongsTo(Teachers, { foreignKey: 'tid' })
