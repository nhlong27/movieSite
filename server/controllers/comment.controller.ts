import { Request, Response } from 'express';
import { CommentDeleteType, CommentType, CommentUpdateType } from '../schemas/comment.schema.js';
import {
  createComment,
  deleteComment,
  findComment,
  findCommentsByMediaId,
  updateComment,
} from '../services/comment.service.js';

const updateCommentHandler = async (req: Request<CommentUpdateType['params']>, res: Response) => {
  try {
    const user = res.locals.user._id;
    const id = req.params.id;
    const update = req.body;
    let comment = await findComment({ user, id });
    if (!comment) {
      comment = await createComment({ ...update, user: user, id: id });
      return res.send(comment);
    }
    const updatedComment = await updateComment({ user, id }, update, { new: true });
    return res.send(updatedComment);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

const getCommentsByMediaIdHandler = async (req: Request, res: Response) => {
  try {
    const mediaId = req.params.id;
    if (mediaId === '404') {
      return res.status(404).send('No comment found.');
    }
    let comments = await findCommentsByMediaId({ mediaId });
    if (!comments) {
      return res.send([]);
    }
    return res.send(comments);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

const deleteCommentHandler = async (req: Request<CommentDeleteType['params']>, res: Response) => {
  try {
    const user = res.locals.user._id;
    const id = req.params.id;
    const success = await deleteComment({ user, id });
    if (!success) return res.status(404).send('Comment not found.');
    return res.send('Delete successfully.');
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export { updateCommentHandler, deleteCommentHandler, getCommentsByMediaIdHandler };
