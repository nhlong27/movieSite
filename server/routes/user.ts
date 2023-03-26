import express from 'express'
import { signInHandler, signOutHandler, signUpHandler, userDeactivateHandler, userQueryHandler, userUpdateHandler } from '../controllers/user.controller.js';
import { requireUser } from '../middlewares/requireUser.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { UserSchema, UserSignInSchema, UserUpdateSchema } from '../schemas/user.schema.js';

import bodyParser from 'body-parser'

const router = express.Router();

router.route('/').get(requireUser, userQueryHandler)

router.post('/SignUp', validateRequest(UserSchema), signUpHandler)
router.post('/SignIn', validateRequest(UserSignInSchema), signInHandler)
router.get('/SignOut', requireUser, signOutHandler)

router.delete('/', requireUser, userDeactivateHandler)

router.patch('/', requireUser, validateRequest(UserUpdateSchema), userUpdateHandler) 

// bodyParser.raw({ type: 'image/jpg', limit: '10mb' })
export default router