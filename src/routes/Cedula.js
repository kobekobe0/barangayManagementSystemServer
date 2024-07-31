import express from 'express';
import { createCedula, deleteCedula, saveCedulaItems } from '../controllers/mutation/cedula.mutation.js';
import { getCedula, getCedulas, printCedula } from '../controllers/query/cedula.query.js';

const cedulaRouter = express.Router();


cedulaRouter.post('/', createCedula); 
cedulaRouter.put('/:id', saveCedulaItems);
cedulaRouter.delete('/:id', deleteCedula);

cedulaRouter.get('/', getCedulas);
cedulaRouter.get('/:id', getCedula);
cedulaRouter.get('/print/:id', printCedula);


export default cedulaRouter;