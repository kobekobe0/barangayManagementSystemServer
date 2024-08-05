import express from 'express'
import { createForm, createID, rePrintForm } from '../controllers/mutation/form.mutation.js';
import { processImage, uploadSingleImage } from '../middleware/uploadImage.js';
import { getForms, getResidentForms, getForm } from '../controllers/query/form.query.js';

const formRouter = express.Router();

formRouter.post('/', createForm);
formRouter.post('/:id', createID);
formRouter.post('/non-resident', uploadSingleImage, processImage, createForm);

formRouter.get('/resident/:id', getResidentForms);
formRouter.get('/', getForms);
formRouter.get('/id/:id', getForm)

formRouter.get('/reprint/:id', rePrintForm)

export default formRouter;