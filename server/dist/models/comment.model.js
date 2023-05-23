import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    mediaId: { type: String, required: true },
    avatar: String,
    userName: String,
    id: { type: String, required: true },
    content: String,
    href: String,
    children: [{ type: String }],
    isRoot: Boolean,
}, {
    timestamps: true,
});
const CommentModel = mongoose.model("Comment", CommentSchema);
export { CommentModel };
//# sourceMappingURL=comment.model.js.map