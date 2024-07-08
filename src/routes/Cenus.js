import express from 'express'
import { createCensus, createHousehold } from '../controllers/mutation/census.mutation.js'
import { getAllCensus } from '../controllers/query/census.query.js'

const censusRouter = express.Router()

censusRouter.post('/create', createCensus)
censusRouter.post('/household/create/:id', createHousehold)

censusRouter.get('/', getAllCensus)

export default censusRouter