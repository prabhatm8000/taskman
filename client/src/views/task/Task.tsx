import apiClient from "@/apiCalls/apiClient";
import LoadingCircle from "@/components/LoadingCircle";
import useTaskStore from "@/store/task/store";
import { useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";

function Task() {
    const { tasks, setTasks, loading, setLoading, setError } = useTaskStore();

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await apiClient.taskAPICalls.getTasks();
            if ("success" in response) {
                setError(response);
                setLoading(false);
                return;
            }
            setTasks(response);
            setLoading(false);
        } catch (error: any) {
            setError({
                message: error.message,
                success: false,
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="py-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <TaskForm />

                <div className="flex flex-col gap-4 w-full">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl">Tasks</h1>
                        {loading && <LoadingCircle className="size-5" />}
                    </div>
                    {tasks.map((task) => (
                        <TaskItem key={task._id} task={task} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Task;
