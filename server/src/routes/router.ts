import express, { Router } from "express";
import path from "path";
import envvars from "../contants/envvar";
import taskRouter from "./task";
import userRouter from "./user";

const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/task", taskRouter);

const router = Router();

router.use("/api", apiRouter);

const clientBuildPath = path.join(__dirname, "../../clientBuild");

if (envvars.NODE_ENV !== "dev") {
    router.use(
        express.static(clientBuildPath, {
            maxAge: "30d", // caching
            etag: true, // force cache use
            setHeaders: (res, filePath) => {
                // not caching index.html
                if (filePath.endsWith("index.html")) {
                    res.setHeader("Cache-Control", "no-store");
                }
            },
        })
    );

    // for prod, serving ui files
    router.use((req, res) => {
        res.setHeader("Cache-Control", "no-store");
        res.sendFile(path.join(clientBuildPath, "index.html"));
    });
}

export default router;
