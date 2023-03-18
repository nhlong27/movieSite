import { validateRequest } from '../middlewares/validateRequest.js';
import express from 'express';
import { AuthSchema } from '../schemas/auth.schema.js';
import { requireUser } from '../middlewares/requireUser.js';
import { createJWTHandler } from '../controllers/jwt.controller.js';
const router = express.Router();
router.route('/');
// router.post('/', validateRequest(AuthSchema), createSessionHandler)
// router.get('/', requireUser, getSessionHandler)
// router.delete('/', requireUser, deleteSessionHandler)
router.post('/', validateRequest(AuthSchema), createJWTHandler);
router.get('/test', requireUser, (req, res) => {
    res.send('Ok');
});
export default router;
//# sourceMappingURL=logIn.js.map