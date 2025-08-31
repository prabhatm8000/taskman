import dotenv from "dotenv";

dotenv.config({
    quiet: true,
});

const envvars = {
    MONGODB_URI: process.env.MONGODB_URI as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    NODE_ENV: process.env.NODE_ENV as string,
};

export default envvars;
