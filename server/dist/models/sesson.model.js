import mongoose from "mongoose";
const SessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: { type: String }
}, {
    timestamps: true,
});
const SessionModel = mongoose.model("Session", SessionSchema);
export { SessionModel };
//# sourceMappingURL=sesson.model.js.map