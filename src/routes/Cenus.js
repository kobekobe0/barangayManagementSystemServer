import express from 'express'
import { createCensus, createFamily, createHousehold, deleteFamily, saveMember } from '../controllers/mutation/census.mutation.js'
import { getAllCensus, getHousehold, getHouseholdFamilies } from '../controllers/query/census.query.js'

const censusRouter = express.Router()

censusRouter.post('/create', createCensus)


censusRouter.get('/', getAllCensus)


// ---- Households ----
censusRouter.post('/household/create/:id', createHousehold)

censusRouter.get('/household/:id', getHousehold)

// ---- Families ----
censusRouter.post('/family/create/:id', createFamily)

censusRouter.delete('/family/delete/:id', deleteFamily)

censusRouter.get('/family-in-household/:id', getHouseholdFamilies)

// ---- Members ----

censusRouter.post('/member/save/:id', saveMember)

export default censusRouter