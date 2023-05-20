import { CommentModel } from '../models/comment.model.js';
const createComment = async (input) => {
    return CommentModel.create(input);
};
const findComments = async (query, options = { lean: true }) => {
    return CommentModel.find(query, {}, options);
};
const findComment = async (query, options = { lean: true }) => {
    return CommentModel.findOne(query, {}, options);
};
const updateComment = async (query, update, options) => {
    return CommentModel.findOneAndUpdate(query, update, options);
};
const deleteComment = async (query) => {
    return CommentModel.deleteOne(query);
};
export { createComment, updateComment, findComments, deleteComment, findComment };
//# sourceMappingURL=comment.service.js.map