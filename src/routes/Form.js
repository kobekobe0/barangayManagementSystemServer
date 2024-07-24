import express from 'express'
import { createForm } from '../controllers/mutation/form.mutation.js';

const formRouter = express.Router();

formRouter.post('/', createForm);

export default formRouter;