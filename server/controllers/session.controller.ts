// import { createSession, findSession, updateSession } from '../services/session.service.js';
// import { validatePassword } from '../services/user.service.js'
// import { signJWT } from '../utils/jwt.utils.js';
// import {Request, Response} from 'express'

// const createSessionHandler = async (req: Request, res: Response) => {
//   // Validate password
//   const user = await validatePassword(req.body);
//   if (!user) return res.status(400).send("Invalid email or password");
//   // Create a session
//   const session = await createSession(user._id, req.get('user-agent') || '')

//   // Add session id to cookie
//   res.cookie('sessionId', session._id, {
//     httpOnly: true,
//     sameSite: 'strict'
//   })

//   return res.redirect('/logIn')
// }

// const getSessionHandler = async (req: Request, res: Response) => {
//   const userId = res.locals.user._id;
//   const sessions = await findSession({user: userId, valid: true})
//   return res.send(sessions);
// }

// const deleteSessionHandler = async (req: Request, res: Response) => {
//   const sessionId = res.locals.user.session;

//   await updateSession({_id: sessionId}, {valid: false})

//   res.clearCookie('sessionId')
//   return res.redirect('/')
// }

// export {createSessionHandler, getSessionHandler, deleteSessionHandler}