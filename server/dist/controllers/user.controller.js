import { createUser, deactivateUser, validatePassword, } from '../services/user.service.js';
import { UserModel } from '../models/user.model.js';
import { signJWT } from '../utils/jwt.utils.js';
import _ from 'lodash';
import bcrypt from 'bcrypt';
const signUpHandler = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send(`User with email ${user.email} already exists`);
        // Create user
        const newUser = await createUser(req.body);
        // Create tokens
        // base64 encoded image data is too big to be put in jwt header --> separate query for profile avatar
        const accessToken = signJWT({ ...newUser, avatar: _ }, { expiresIn: '15m' }); // 15mins
        const refreshToken = signJWT({ ...newUser, avatar: _ }, { expiresIn: '1y' }); //1 year
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            //maxAge: 1000000,
            //signed: true
            domain: process.env.DOMAIN,
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            //maxAge: 1000000,
            //signed: true
            domain: process.env.DOMAIN,
        });
        return res.send(newUser);
    }
    catch (e) {
        return res.status(400).send(e.message);
    }
};
const signInHandler = async (req, res) => {
    try {
        const user = await validatePassword(req.body);
        if (!user)
            return res.status(403).send('Invalid email or password.');
        // Create tokens
        // base64 encoded image data is too big to be put in jwt header --> separate query for profile avatar
        const accessToken = signJWT({ ...user, avatar: _ }, { expiresIn: '15m' }); // 15mins
        const refreshToken = signJWT({ ...user, avatar: _ }, { expiresIn: '1y' }); //1 year
        // Add tokens to cookie
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            //maxAge: 1000000,
            //signed: true
            domain: process.env.DOMAIN,
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            //maxAge: 1000000,
            //signed: true
            domain: process.env.DOMAIN,
        });
        return res.send(user);
    }
    catch (e) {
        console.error(e);
        return res.status(400).send(e.message);
    }
};
const signOutHandler = async (req, res) => {
    try {
        res.clearCookie('accessToken', {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            //maxAge: 1000000,
            //signed: true
            domain: process.env.DOMAIN,
        });
        res.clearCookie('refreshToken', {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            //maxAge: 1000000,
            //signed: true
            domain: process.env.DOMAIN,
        });
        return res.send('Sign out successfully.');
    }
    catch (e) {
        return res.status(400).send(e.message);
    }
};
const userDeactivateHandler = async (req, res) => {
    try {
        const success = await deactivateUser({
            _id: res.locals.user._id,
            password: req.body.password,
        });
        if (!success)
            return res.status(401).send('Wrong confirmation password.');
        res.clearCookie('accessToken', {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            //maxAge: 1000000,
            //signed: true
            domain: process.env.DOMAIN,
        });
        res.clearCookie('refreshToken', {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            //maxAge: 1000000,
            //signed: true
            domain: process.env.DOMAIN,
        });
        return res.send('Deactivate user successfully.');
    }
    catch (e) {
        return res.status(400).send(e.message);
    }
};
// const avatarUploadHandler = async (req: Request<{}, {}, UserUpdateType>, res: Response) => {
//   try {
//     const user = await UserModel.findOne({ email: res.locals.user.email });
//     if (!user) return res.status(404).send('User not found.');
//   } catch (e: any) {
//     res.status(409).send(e.message);
//   }
// };
const userUpdateHandler = async (req, res) => {
    try {
        let user = await UserModel.findOne({ _id: res.locals.user._id });
        if (!user)
            return res.status(404).send('User not found.');
        if (req.query.type === 'password') {
            const isValid = await bcrypt.compare(req.body.confirmPassword, user.password);
            if (!isValid)
                return res.status(401).send('Wrong confirmation password.');
            user.password = req.body.newPassword;
        }
        else if (req.query.type === 'avatar') {
            //From base64 data to store buffer data in mongodb --> avatar: {data, contentType}
            // const dataStart = base64Data.indexOf(',') + 1;
            // const contentTypeStart = base64Data.indexOf(':') + 1;
            // const contentTypeEnd = base64Data.indexOf(';');
            // const data = Buffer.from(base64Data.slice(dataStart), 'base64');
            // const contentType = base64Data.slice(contentTypeStart, contentTypeEnd);
            const base64Data = req.body.avatar_url;
            user.avatar = base64Data;
        }
        else {
            user.name = req.body.name ?? user.name;
            user.email = req.body.email ?? user.email;
        }
        await user.save();
        return res.status(201).send(user);
    }
    catch (e) {
        res.status(409).send(e.message);
    }
};
const userQueryHandler = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: res.locals.user._id });
        if (!user)
            return res.status(404).send('User not found.');
        return res.send(user);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
};
export { signUpHandler, signInHandler, signOutHandler, userDeactivateHandler, userQueryHandler, userUpdateHandler, };
//# sourceMappingURL=user.controller.js.map