import express from 'express'
import { deleteBorrow, recordBorrow } from '../controllers/mutation/borrow.mutation.js'
import { getBorrows } from '../controllers/query/borrow.query.js'

const borrowRouter = express.Router()

borrowRouter.post('/', recordBorrow)
borrowRouter.delete('/:id', deleteBorrow)

borrowRouter.get('/', getBorrows)

export default borrowRouter