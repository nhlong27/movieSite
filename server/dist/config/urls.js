import dotenv from 'dotenv';
dotenv.config();
export default {
    port: process.env.PORT || 5000,
    mongo: `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@${process.env.MONGOHOST}:${process.env.MONGOPORT}`
};
//# sourceMappingURL=urls.js.map