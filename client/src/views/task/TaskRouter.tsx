import { Route, Routes } from "react-router-dom";
import Task from "./Task";
import TaskLayout from "./TaskLayout";

function TaskRouter() {
    return (
        <TaskLayout>
            <Routes>
                <Route path="/" element={<Task />} />
            </Routes>
        </TaskLayout>
    );
}

export default TaskRouter;
