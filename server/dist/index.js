import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import user from './routes/user.js';
import urls from './config/urls.js';
import { deserializeUserFromJWT } from './middlewares/deserializeUser.js';
// INITIALIZATION CONNECTION
dotenv.config();
const app = express();
mongoose.connect(urls.mongo)
    .then(() => app.listen(urls.port, () => console.log(`[server]: Server is running at http://localhost:${urls.port}`)))
    .catch((error) => console.log(error.message));
// MIDDLEWARES
app.use((express.json({ limit: "30mb" })));
app.use((express.urlencoded({ limit: "30mb", extended: true })));
const corsOptions = {
    origin: process.env.CLIENT,
    optionsSuccessStatus: 200,
    credentials: true
};
app.use((cors(corsOptions)));
app.use(cookieParser());
// before deserializer ?
app.use(deserializeUserFromJWT);
// app.use(deserializeUserFromSession)
// ROUTES
app.use('/api/v1/user', user);
//# sourceMappingURL=index.js.map