import apiClient from "@/apiCalls/apiClient";
import Indicator from "@/components/Indicator";
import LoadingCircle from "@/components/LoadingCircle";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import useTaskStore from "@/store/task/store";
import type { ITask } from "@/store/task/types";
import { formatDistance } from "date-fns";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const TaskItem = ({ task }: { task: ITask }) => {
    const { setSelectedTask, selectedTask, removeTask, setError } =
        useTaskStore();
    const [deleting, setDeleting] = useState(false);
    const handleDelete = async () => {
        if (deleting) return;
        setError(null);
        try {
            setDeleting(true);
            await apiClient.taskAPICalls.deleteTask(task._id);
            setSelectedTask(null);
            setDeleting(false);
            removeTask(task._id);
            toast.success("Task deleted successfully");
        } catch (error: any) {
            setError({
                message: error.message,
                success: false,
            });
        }
    };

    return (
        <Card
            onClick={() => setSelectedTask(task)}
            className={
                selectedTask?._id === task._id
                    ? "shadow-xl border-muted-foreground"
                    : "shadow-none border-border/30"
            }
        >
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle
                        className={`text-2xl ${
                            selectedTask?._id === task._id ? "" : "line-clamp-1"
                        } w-[calc(100%-100px)]`}
                    >
                        {task.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 w-[80px]">
                        <Button
                            className="rounded-full"
                            size={"icon"}
                            onClick={() => setSelectedTask(task)}
                        >
                            <Edit />
                        </Button>
                        <Button
                            className="rounded-full"
                            size={"icon"}
                            variant={"destructive"}
                            disabled={deleting}
                            onClick={handleDelete}
                        >
                            {!deleting ? <Trash /> : <LoadingCircle />}
                        </Button>
                    </div>
                </div>
                <CardDescription
                    className={`text-foreground ${
                        selectedTask?._id === task._id ? "" : "line-clamp-2"
                    }`}
                >
                    {task.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-2">
                    <Indicator
                        className={
                            task.status === "COMPLETED"
                                ? "bg-green-500"
                                : "bg-red-500"
                        }
                    />
                    {task.status}
                </span>
                <span className="text-muted-foreground">
                    {formatDistance(task.createdAt, new Date())} ago
                </span>
            </CardContent>
        </Card>
    );
};

export default TaskItem;
