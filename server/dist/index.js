import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import user from './routes/user.js';
import show from './routes/show.js';
import comment from './routes/comment.js';
import urls from './config/urls.js';
import { deserializeUserFromJWT } from './middlewares/deserializeUser.js';
dotenv.config();
const app = express();
// INITIALIZATION CONNECTION
mongoose
    .connect(urls.mongo)
    .then(() => {
    try {
        app.listen(urls.port, () => console.log(`[server]: Server is running at http://localhost:${urls.port}`));
    }
    catch (e) {
        console.log("Can't connect to the server. " + e.message);
    }
})
    .catch((e) => {
    console.log('Invalid Database Connection...!' + e.message);
});
// MIDDLEWARES
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT : process.env.LOCAL,
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
// before deserializer ?
app.use(deserializeUserFromJWT);
// app.use(deserializeUserFromSession)
// ROUTES
app.use('/api/v1/user', user);
app.use('/api/v1/show', show);
app.use('/api/v1/comment', comment);
//# sourceMappingURL=index.js.map