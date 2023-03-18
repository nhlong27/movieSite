import { SessionModel } from "../models/session.model.js";
const createSession = async (userId, userAgent) => {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
};
export { createSession };
//# sourceMappingURL=sesson.service.js.map