import { create } from "zustand";
import type { TaskStore } from "./types";

const useTaskStore = create<TaskStore>((set) => ({
    selectedTask: null,
    tasks: [],
    loading: false,
    error: null,
    setSelectedTask: (task) => set({ selectedTask: task }),
    setTasks: (tasks) => set({ tasks }),
    addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
    updateStatus: (taskId, status) =>
        set((state) => ({
            tasks: state.tasks.map((task) => {
                if (task._id === taskId) {
                    return { ...task, status };
                }
                return task;
            }),
        })),
    updateTask: (taskId, newTask) =>
        set((state) => ({
            tasks: state.tasks.map((task) => {
                if (task._id === taskId) {
                    return { ...newTask };
                }
                return task;
            }),
        })),
    removeTask: (taskId) =>
        set((state) => ({
            tasks: state.tasks.filter((task) => task._id !== taskId),
        })),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));

export default useTaskStore;
