import express from 'express';
import { requireUser } from '../middlewares/requireUser.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { deleteCommentHandler, getCommentsByMediaIdHandler, updateCommentHandler } from '../controllers/comment.controller.js';
import { CommentDeleteSchema, CommentUpdateSchema } from '../schemas/comment.schema.js';
const router = express.Router();
router.route('/:id').get(getCommentsByMediaIdHandler);
router.put('/:id', requireUser, validateRequest(CommentUpdateSchema), updateCommentHandler);
router.delete('/:id', requireUser, validateRequest(CommentDeleteSchema), deleteCommentHandler);
export default router;
//# sourceMappingURL=comment.js.map