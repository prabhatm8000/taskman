import { Router } from "express";
import userController from "../controllers/user";
import authMiddleware from "../middleware/auth";

const userRouter = Router();

userRouter.get("/", authMiddleware, userController.verify);

userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);

userRouter.post("/logout", authMiddleware, userController.logout);

export default userRouter;
