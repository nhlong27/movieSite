import mongoose from "mongoose";
const ShowSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    name: String,
    poster_path: String,
    media_type: String,
    season_number: Number,
    id: { type: String, required: true },
    status: String,
    isFavorited: Boolean,
    score: Number,
}, {
    timestamps: true,
});
const ShowModel = mongoose.model("Show", ShowSchema);
export { ShowModel };
//# sourceMappingURL=show.model.js.map