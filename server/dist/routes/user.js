"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../controllers/user"));
const auth_1 = __importDefault(require("../middleware/auth"));
const userRouter = (0, express_1.Router)();
userRouter.get("/", auth_1.default, user_1.default.verify);
userRouter.post("/login", user_1.default.login);
userRouter.post("/register", user_1.default.register);
userRouter.post("/logout", auth_1.default, user_1.default.logout);
exports.default = userRouter;
