import express from 'express'
import { createCensus, createFamily, createHousehold, deleteFamily, deleteHousehold, saveMember } from '../controllers/mutation/census.mutation.js'
import { getAllCensus, getHousehold, getHouseholdFamilies, getHouseholds } from '../controllers/query/census.query.js'

const censusRouter = express.Router()

censusRouter.post('/create', createCensus)


censusRouter.get('/', getAllCensus)


// ---- Households ----
censusRouter.post('/household/create/:id', createHousehold)
censusRouter.get('/household/:id', getHousehold)
censusRouter.get('/household/census/:id', getHouseholds)
censusRouter.delete('/household/delete/:id', deleteHousehold)

// ---- Families ----
censusRouter.post('/family/create/:id', createFamily)
censusRouter.delete('/family/delete/:id', deleteFamily)
censusRouter.get('/family-in-household/:id', getHouseholdFamilies)

// ---- Members ----

censusRouter.post('/member/save/:id', saveMember)

export default censusRouter