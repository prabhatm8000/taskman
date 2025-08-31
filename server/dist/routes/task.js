"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_1 = __importDefault(require("../controllers/task"));
const auth_1 = __importDefault(require("../middleware/auth"));
const taskRouter = (0, express_1.Router)();
taskRouter.use(auth_1.default);
taskRouter
    .route("/")
    .get(task_1.default.getTasks)
    .post(task_1.default.createTask);
taskRouter
    .route("/:id")
    .get(task_1.default.getTasks)
    .put(task_1.default.updateTask)
    .delete(task_1.default.deleteTask);
taskRouter.put("/:id/status", task_1.default.updateStatus);
exports.default = taskRouter;
