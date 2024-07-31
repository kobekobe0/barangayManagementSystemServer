import express from 'express';
import { createIndigent, createIndigentHolder, editIndigent, editIndigentHolder } from '../controllers/mutation/indigent.mutation.js';
import { getIndigentHolders, getIndigents, getLatestIndigentHolder, getNumbers, getResidentIndigentHistory, getpatientLastIndigentDate, printIndigents, searchIndigent } from '../controllers/query/indigent.query.js';

const indigentRouter = express.Router();

indigentRouter.post('/holder', createIndigentHolder);
indigentRouter.post('/item', createIndigent) 

indigentRouter.put('/holder/:id', editIndigentHolder);
indigentRouter.put('/item/:id', editIndigent);

indigentRouter.get('/holder', getLatestIndigentHolder)
indigentRouter.get('/holder/all', getIndigentHolders)
indigentRouter.get('/number/:id', getNumbers)
indigentRouter.get('/last-claim/:id', getpatientLastIndigentDate)

indigentRouter.get('/item', getIndigents)
indigentRouter.get('/item/search', searchIndigent)
indigentRouter.get('/resident/:id', getResidentIndigentHistory)

indigentRouter.get('/print/:id', printIndigents)

export default indigentRouter;