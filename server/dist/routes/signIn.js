import { createUserHandler } from '../controllers/user.controller.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { UserSchema } from '../schemas/user.schema.js';
import express from 'express';
const router = express.Router();
router.route('/');
router.post('/', validateRequest(UserSchema), createUserHandler);
// router.post('/', validateRequest(UserSchema), createUserHandler)
export default router;
//# sourceMappingURL=signIn.js.map