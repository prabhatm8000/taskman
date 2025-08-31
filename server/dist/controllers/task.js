"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const error_1 = require("../lib/error");
const task_1 = __importDefault(require("../models/task"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const tasks = yield task_1.default.aggregate([
            {
                $match: {
                    userId: new mongoose_1.default.Types.ObjectId(userId),
                },
            },
            {
                $sort: {
                    updatedAt: -1,
                },
            },
        ]);
        res.status(200).json(tasks);
    }
    catch (error) {
        (0, error_1.apiErrorHandler)(error, req, res);
    }
});
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const taskId = req.params.id;
        const task = yield task_1.default.findOne({
            _id: taskId,
            userId: userId,
        });
        res.status(200).json(task);
    }
    catch (error) {
        (0, error_1.apiErrorHandler)(error, req, res);
    }
});
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const task = yield task_1.default.create(Object.assign(Object.assign({}, req.body), { userId }));
        res.status(201).json(task);
    }
    catch (error) {
        (0, error_1.apiErrorHandler)(error, req, res);
    }
});
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const taskId = req.params.id;
        const task = yield task_1.default.findOneAndUpdate({ _id: taskId, userId }, req.body, { new: true });
        res.status(200).json(task);
    }
    catch (error) {
        (0, error_1.apiErrorHandler)(error, req, res);
    }
});
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const taskId = req.params.id;
        const status = req.body.status;
        const task = yield task_1.default.findOneAndUpdate({ _id: taskId, userId }, { status }, { new: true });
        res.status(200).json(task);
    }
    catch (error) {
        (0, error_1.apiErrorHandler)(error, req, res);
    }
});
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const taskId = req.params.id;
        const task = yield task_1.default.findOneAndDelete({ _id: taskId, userId });
        res.status(200).json(task);
    }
    catch (error) {
        (0, error_1.apiErrorHandler)(error, req, res);
    }
});
const taskController = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    updateStatus,
    deleteTask,
};
exports.default = taskController;
