import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const UserMongoSchema = new mongoose.Schema({
    email: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    password: { type: String, require: true }
}, {
    timestamps: true,
});
UserMongoSchema.pre("save", async function (next) {
    let user = this;
    if (!user.isModified("password"))
        return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return next();
});
UserMongoSchema.methods.comparePassword = async function (candidatePassword) {
    const user = this;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};
const UserModel = mongoose.model("User", UserMongoSchema);
export { UserModel };
//# sourceMappingURL=user.model.js.map