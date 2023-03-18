import express from 'express'
import { signInHandler, signOutHandler, signUpHandler } from '../controllers/user.controller.js';
import { requireUser } from '../middlewares/requireUser.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { SignInSchema } from '../schemas/signIn.schema.js';
import { UserSchema } from '../schemas/user.schema.js';

const router = express.Router();

router.route('/').get((req, res)=>{
  res.send('Profile!!')
})

router.post('/SignUp', validateRequest(UserSchema), signUpHandler)
router.post('/SignIn', validateRequest(SignInSchema), signInHandler)
router.get('/test', requireUser, (req, res) => {
  res.send('Ok')
})
router.get('/SignOut', requireUser, signOutHandler)


export default router