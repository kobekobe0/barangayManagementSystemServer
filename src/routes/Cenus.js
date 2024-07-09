import express from 'express'
import { createCensus, createFamily, createHousehold, deleteFamily } from '../controllers/mutation/census.mutation.js'
import { getAllCensus, getHousehold, getHouseholdFamilies } from '../controllers/query/census.query.js'
import Family from '../models/Family.js'

const censusRouter = express.Router()

censusRouter.post('/create', createCensus)


censusRouter.get('/', getAllCensus)


// ---- Households ----
censusRouter.post('/household/create/:id', createHousehold)

censusRouter.get('/household/:id', getHousehold)

// ---- Families ----
censusRouter.post('/family/create/:id', createFamily)

censusRouter.delete('/family/delete/:id', deleteFamily)

censusRouter.get('/family/household/:id', getHouseholdFamilies)

export default censusRouter