import type { Request, Response } from "express";
import mongoose from "mongoose";
import { apiErrorHandler } from "../lib/error";
import Task, { type ITask } from "../models/task";

const getTasks = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id!;
        const tasks = await Task.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $sort: {
                    updatedAt: -1,
                },
            },
        ]);
        res.status(200).json(tasks);
    } catch (error) {
        apiErrorHandler(error, req, res);
    }
};

const getTaskById = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id!;
        const taskId = req.params.id;
        const task = await Task.findOne({
            _id: taskId,
            userId: userId,
        });
        res.status(200).json(task);
    } catch (error) {
        apiErrorHandler(error, req, res);
    }
};

const createTask = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id!;
        const task = await Task.create({ ...req.body, userId });
        res.status(201).json(task);
    } catch (error) {
        apiErrorHandler(error, req, res);
    }
};

const updateTask = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id!;
        const taskId = req.params.id;
        const task = await Task.findOneAndUpdate(
            { _id: taskId, userId },
            req.body,
            { new: true }
        );
        res.status(200).json(task);
    } catch (error) {
        apiErrorHandler(error, req, res);
    }
};

const updateStatus = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id!;
        const taskId = req.params.id;
        const status = req.body.status as ITask["status"];
        const task = await Task.findOneAndUpdate(
            { _id: taskId, userId },
            { status },
            { new: true }
        );
        res.status(200).json(task);
    } catch (error) {
        apiErrorHandler(error, req, res);
    }
};

const deleteTask = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id!;
        const taskId = req.params.id;
        const task = await Task.findOneAndDelete({ _id: taskId, userId });
        res.status(200).json(task);
    } catch (error) {
        apiErrorHandler(error, req, res);
    }
};

const taskController = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    updateStatus,
    deleteTask,
};

export default taskController;
