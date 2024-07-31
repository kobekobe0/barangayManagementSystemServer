import express from 'express'
import { createReceipt, deleteReceipt, saveReceiptItems } from '../controllers/mutation/receipt.mutation.js'
import { getReceipt, getReceipts, printReceipt } from '../controllers/query/receipt.query.js'

const receiptRouter = express.Router()

receiptRouter.post('/create', createReceipt)
receiptRouter.delete('/:id', deleteReceipt)

receiptRouter.get('/:id', getReceipt)
receiptRouter.get('/', getReceipts)
receiptRouter.get('/print/:id', printReceipt)

receiptRouter.put('/:id', saveReceiptItems)

export default receiptRouter