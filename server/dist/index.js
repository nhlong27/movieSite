import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
const port = process.env.PORT;
const corsOptions = {
    origin: process.env.CLIENT,
    optionsSuccessStatus: 200
};
app.use((cors(corsOptions)));
app.get('/profile', (req, res) => {
    res.send('Express + TypeScript Server Working again');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map