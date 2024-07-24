import express from 'express'
import { createBusiness, deleteBusiness, updateBusiness } from '../controllers/mutation/business.mutation.js'
import { getAllBusinesses, getBusiness, getBusinessNumbers } from '../controllers/query/business.query.js'

const businessRouter = express.Router()

businessRouter.post('/create', createBusiness)

businessRouter.get('/', getAllBusinesses)
businessRouter.get('/get-by-id/:id', getBusiness)
businessRouter.get('/statistics', getBusinessNumbers)

businessRouter.put('/update/:id', updateBusiness) //updating details / closing business
businessRouter.delete('/delete/:id', deleteBusiness) //deleting business

export default businessRouter