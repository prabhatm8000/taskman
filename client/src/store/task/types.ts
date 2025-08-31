import type { APIErrorType } from "@/apiCalls/error";

export type BasicTaskType = {
    title: ITask["title"];
    description: ITask["description"];
    status: ITask["status"];
};

export type ITask = {
    _id: string;
    userId: string;
    title: string;
    description: string;
    status: "PENDING" | "COMPLETED";
    createdAt: string;
    updatedAt: string;
};

export type TaskStore = {
    selectedTask: ITask | null;
    tasks: ITask[];
    loading: boolean;
    error: APIErrorType | null;
    setSelectedTask: (task: ITask | null) => void;
    setTasks: (tasks: ITask[]) => void;
    addTask: (task: ITask) => void;
    updateStatus: (taskId: string, status: ITask["status"]) => void;
    updateTask: (taskId: string, newTask: ITask) => void;
    removeTask: (taskId: string) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: APIErrorType | null) => void;
};
