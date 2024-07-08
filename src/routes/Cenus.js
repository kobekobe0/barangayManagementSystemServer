import express from 'express'
import { createCensus, createHousehold } from '../controllers/mutation/census.mutation.js'

const censusRouter = express.Router()

censusRouter.post('/create', createCensus)
censusRouter.post('/household/create/:id', createHousehold)

export default censusRouter