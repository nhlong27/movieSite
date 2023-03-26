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
const validatePassword = async ({ _id, email, password }) => {
    let user;
    if (_id) {
        user = await UserModel.findOne({ _id });
    }
    else {
        user = await UserModel.findOne({ email });
    }
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
const deactivateUser = async ({ _id, password }) => {
    const user = await validatePassword({ _id, password });
    if (!user)
        return false;
    await UserModel.deleteOne({ _id });
    return true;
};
export { createUser, validatePassword, findUser, deactivateUser };
//# sourceMappingURL=user.service.js.map