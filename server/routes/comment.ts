import express from 'express'
import { requireUser } from '../middlewares/requireUser.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { deleteCommentHandler, getAllCommentsHandler, updateCommentHandler } from '../controllers/comment.controller.js';
import { CommentDeleteSchema, CommentUpdateSchema } from '../schemas/comment.schema.js';


const router = express.Router();

router.route('/').get(requireUser, getAllCommentsHandler)

router.put('/:id', requireUser, validateRequest(CommentUpdateSchema), updateCommentHandler)

router.delete('/:id', requireUser, validateRequest(CommentDeleteSchema), deleteCommentHandler)

export default router