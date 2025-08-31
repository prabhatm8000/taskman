import { Router } from "express";
import taskController from "../controllers/task";
import authMiddleware from "../middleware/auth";

const taskRouter = Router();

taskRouter.use(authMiddleware);

taskRouter
    .route("/")
    .get(taskController.getTasks)
    .post(taskController.createTask);

taskRouter
    .route("/:id")
    .get(taskController.getTasks)
    .put(taskController.updateTask)
    .delete(taskController.deleteTask);

taskRouter.put("/:id/status", taskController.updateStatus);
export default taskRouter;
