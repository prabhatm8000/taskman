import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { connectDB } from "./lib/database";
import router from "./routes/router";

const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(
    express.json({
        limit: "1mb",
    })
);
app.use(cookieParser());

app.use(router);

app.listen(3000, () => {
    connectDB();
    console.log("Server is running on port 3000");
});
