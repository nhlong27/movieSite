import { signJWT } from '../utils/jwt.utils.js';
const createJWTHandler = async (req, res, user) => {
    // Create asscess token
    const accessToken = signJWT({ ...user }, { expiresIn: '15m' }); // 15mins
    // Create refresh token
    const refreshToken = signJWT({ ...user }, { expiresIn: '1y' }); //1 year
    // Add tokens to cookie
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        //secure: true,
        //maxAge: 1000000,
        //signed: true
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        //secure: true,
        //maxAge: 1000000,
        //signed: true
    });
    // return res.redirect('/logIn')
    return res.send('logged in !');
};
export { createJWTHandler };
//# sourceMappingURL=jwt.controller.js.map