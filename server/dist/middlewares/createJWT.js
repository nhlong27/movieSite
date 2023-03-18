import { signJWT } from '../utils/jwt.utils.js';
const createJWT = async (req, res, next) => {
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
    next();
};
export { createJWT };
//# sourceMappingURL=createJWT.js.map