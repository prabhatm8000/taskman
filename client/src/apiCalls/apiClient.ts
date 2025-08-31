import type { IUser } from "@/store/user/types";
import type { BasicTaskType, ITask } from "../store/task/types";
import type { APIErrorType } from "./error";

const BASE_URL = import.meta.env.DEV ? "http://localhost:3000/api" : "/api";

console.log(BASE_URL);

const login = async (
    username: string,
    password: string
): Promise<IUser | APIErrorType> => {
    const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });
    return response.json();
};

const register = async (
    username: string,
    password: string
): Promise<IUser | APIErrorType> => {
    const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
};

const logout = async (): Promise<IUser | APIErrorType> => {
    const response = await fetch(`${BASE_URL}/user/logout`, {
        method: "POST",
        credentials: "include",
    });
    return response.json();
};

const verify = async (): Promise<IUser | APIErrorType> => {
    const response = await fetch(`${BASE_URL}/user`, {
        credentials: "include",
    });
    return response.json();
};

const userAPICalls = { login, register, logout, verify };

const getTasks = async (): Promise<ITask[] | APIErrorType> => {
    const response = await fetch(`${BASE_URL}/task`, {
        method: "GET",
        credentials: "include",
    });
    return response.json();
};

const getById = async (taskId: string): Promise<ITask | APIErrorType> => {
    const response = await fetch(`${BASE_URL}/task/${taskId}`, {
        method: "GET",
        credentials: "include",
    });
    return response.json();
};

const createTask = async (
    task: BasicTaskType
): Promise<ITask | APIErrorType> => {
    const response = await fetch(`${BASE_URL}/task`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });
    return response.json();
};

const updateStatus = async (
    taskId: string,
    status: ITask["status"]
): Promise<ITask | APIErrorType> => {
    const response = await fetch(`${BASE_URL}/task/${taskId}/status`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
    });
    return response.json();
};

const updateTask = async (
    taskId: string,
    task: BasicTaskType
): Promise<ITask | APIErrorType> => {
    const response = await fetch(`${BASE_URL}/task/${taskId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });
    return response.json();
};

const deleteTask = async (taskId: string): Promise<ITask | APIErrorType> => {
    const response = await fetch(`${BASE_URL}/task/${taskId}`, {
        method: "DELETE",
        credentials: "include",
    });
    return response.json();
};

const taskAPICalls = {
    getTasks,
    getById,
    createTask,
    updateTask,
    deleteTask,
    updateStatus,
};

const apiClient = { userAPICalls, taskAPICalls };
export default apiClient;
