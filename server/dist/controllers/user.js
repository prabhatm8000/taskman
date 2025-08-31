"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const authCookie_1 = require("../lib/authCookie");
const error_1 = __importStar(require("../lib/error"));
const user_1 = __importDefault(require("../models/user"));
const verify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const user = yield user_1.default.findOne({ _id: userId });
        if (!user) {
            throw new error_1.default("User not found", 404);
        }
        res.status(200).json({
            id: user._id,
            username: user.username,
        });
    }
    catch (error) {
        (0, error_1.apiErrorHandler)(error, req, res);
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield user_1.default.findOne({ username });
        if (!user) {
            throw new error_1.default("User not found", 404);
        }
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            throw new error_1.default("Invalid credentials", 401);
        }
        (0, authCookie_1.setAuthCookie)(res, {
            id: user._id,
            username: user.username,
        });
        res.status(200).json({
            id: user._id,
            username: user.username,
        });
    }
    catch (error) {
        (0, error_1.apiErrorHandler)(error, req, res);
    }
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const existingUser = yield user_1.default.findOne({ username });
        if (existingUser) {
            throw new error_1.default("User already exists", 400);
        }
        const user = new user_1.default({ username, password });
        yield user.save();
        (0, authCookie_1.setAuthCookie)(res, {
            id: user._id,
            username: user.username,
        });
        res.status(201).json({
            id: user._id,
            username: user.username,
        });
    }
    catch (error) {
        (0, error_1.apiErrorHandler)(error, req, res);
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, authCookie_1.removeAuthCookie)(res);
        res.status(200).json({ success: true });
    }
    catch (error) {
        (0, error_1.apiErrorHandler)(error, req, res);
    }
});
const userController = { verify, login, register, logout };
exports.default = userController;
