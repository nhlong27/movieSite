import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { CommentDocument, CommentModel } from '../models/comment.model.js';

const createComment = async (
  input: DocumentDefinition<Omit<CommentDocument, 'createdAt' | 'updatedAt'>>,
) => {
  return CommentModel.create(input);
};

const findCommentsByMediaId = async (
  query: FilterQuery<CommentDocument>,
  options: QueryOptions = { lean: true },
) => {
  return CommentModel.find(query, {}, options);
};

const findComment = async (
  query: FilterQuery<CommentDocument>,
  options: QueryOptions = { lean: true },
) => {
  return CommentModel.findOne(query, {}, options);
};


const updateComment = async (
  query: FilterQuery<CommentDocument>,
  update: UpdateQuery<CommentDocument>,
  options: QueryOptions,
) => {
  return CommentModel.findOneAndUpdate(query, update, options);
};

const deleteComment = async (query: FilterQuery<CommentDocument>) => {
  return CommentModel.deleteOne(query);
};

export {createComment, updateComment, findCommentsByMediaId, deleteComment, findComment}