import { createSession, findSession, updateSession } from '../services/session.service.js';
import { validatePassword } from '../services/user.service.js';
const createSessionHandler = async (req, res) => {
    // Validate password
    const user = await validatePassword(req.body);
    if (!user)
        return res.status(400).send("Invalid email or password");
    // Create a session
    const session = await createSession(user._id, req.get('user-agent') || '');
    // Add session id to cookie
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        sameSite: 'strict'
    });
    return res.redirect('/logIn');
};
const getSessionHandler = async (req, res) => {
    const userId = res.locals.user._id;
    const sessions = await findSession({ user: userId, valid: true });
    return res.send(sessions);
};
const deleteSessionHandler = async (req, res) => {
    const sessionId = res.locals.user.session;
    await updateSession({ _id: sessionId }, { valid: false });
    res.clearCookie('sessionId');
    return res.redirect('/');
};
export { createSessionHandler, getSessionHandler, deleteSessionHandler };
//# sourceMappingURL=session.controller.js.map