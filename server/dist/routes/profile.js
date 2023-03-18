import express from 'express';
const router = express.Router();
router.route('/').get((req, res) => {
    res.send('Profile!!');
});
export default router;
//# sourceMappingURL=profile.js.map