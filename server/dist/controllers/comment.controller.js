import { createComment, deleteComment, findComment, findComments, updateComment, } from '../services/comment.service.js';
const updateCommentHandler = async (req, res) => {
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
    }
    catch (e) {
        res.status(400).send(e.message);
    }
};
const getAllCommentsHandler = async (req, res) => {
    try {
        const user = res.locals.user._id;
        const comments = await findComments({});
        if (!comments)
            return res.status(404).send('No comment found.');
        return res.send(comments);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
};
const deleteCommentHandler = async (req, res) => {
    try {
        const user = res.locals.user._id;
        const id = req.params.id;
        const success = await deleteComment({ user, id });
        if (!success)
            return res.status(404).send('Comment not found.');
        return res.send('Delete successfully.');
    }
    catch (e) {
        res.status(400).send(e.message);
    }
};
export { updateCommentHandler, deleteCommentHandler, getAllCommentsHandler };
//# sourceMappingURL=comment.controller.js.map