import { UserModel } from "../models/user.model.js";
import pgk from "lodash";
const createUser = async (input) => {
    try {
        const user = await UserModel.create(input);
        return pgk.omit(user.toJSON(), 'password');
    }
    catch (e) {
        throw new Error(e);
    }
};
const validatePassword = async ({ email, password }) => {
    const user = await UserModel.findOne({ email });
    if (!user)
        return false;
    const isValid = await user.comparePassword(password);
    if (!isValid)
        return false;
    return pgk.omit(user.toJSON(), 'password');
};
const findUser = async (query) => {
    return UserModel.findOne(query).lean();
};
const deactivateUser = async ({ email: email, password }) => {
    try {
        const user = await validatePassword({ email, password });
        await UserModel.deleteOne({ email });
        return true;
    }
    catch (e) {
        throw new Error(e);
    }
};
export { createUser, validatePassword, findUser, deactivateUser };
//# sourceMappingURL=user.service.js.map