import { SessionModel } from "../models/session.model.js";
const createSession = async (userId, userAgent) => {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
};
const findSession = async (query) => {
    return SessionModel.find(query).lean();
};
const updateSession = async (query, update) => {
    return SessionModel.updateOne(query, update);
};
export { createSession, findSession, updateSession };
//# sourceMappingURL=session.service.js.map