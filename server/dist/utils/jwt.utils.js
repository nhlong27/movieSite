import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const private_key = process.env.PRIVATE_KEY;
const public_key = process.env.PUBLIC_KEY;
const signJWT = (object, options) => {
    return jwt.sign(object, private_key, {
        ...(options && options),
        algorithm: 'RS256'
    });
};
const verifyJWT = (token) => {
    try {
        const decoded = jwt.verify(token, public_key);
        return {
            valid: true,
            expired: false,
            decoded
        };
    }
    catch (e) {
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null
        };
    }
};
export { signJWT, verifyJWT };
//# sourceMappingURL=jwt.utils.js.map