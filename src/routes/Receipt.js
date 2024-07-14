import express from 'express'
import { createReceipt, saveReceiptItems } from '../controllers/mutation/receipt.mutation.js'
import { getReceipt, getReceipts } from '../controllers/query/receipt.query.js'

const receiptRouter = express.Router()

receiptRouter.post('/create', createReceipt)

receiptRouter.get('/:id', getReceipt)
receiptRouter.get('/', getReceipts)

receiptRouter.put('/:id', saveReceiptItems)

export default receiptRouter