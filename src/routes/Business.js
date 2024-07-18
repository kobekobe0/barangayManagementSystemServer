import express from 'express'
import { createBusiness } from '../controllers/mutation/business.mutation.js'
import { getAllBusinesses, getBusinessNumbers } from '../controllers/query/business.query.js'

const businessRouter = express.Router()

businessRouter.post('/create', createBusiness)

businessRouter.get('/', getAllBusinesses)

businessRouter.get('/statistics', getBusinessNumbers)
export default businessRouter