import express from 'express'
import { deleteShowHandler, getShowHandler, updateShowHandler } from '../controllers/show.controller.js';
import { requireUser } from '../middlewares/requireUser.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { ShowDeleteSchema, ShowGetSchema, ShowSchema } from '../schemas/show.schema.js';


const router = express.Router();

router.route('/:id').get(requireUser, validateRequest(ShowGetSchema), getShowHandler)

router.put('/:id', requireUser, validateRequest(ShowSchema), updateShowHandler)

router.delete('/:id', requireUser, validateRequest(ShowDeleteSchema), deleteShowHandler)

export default router