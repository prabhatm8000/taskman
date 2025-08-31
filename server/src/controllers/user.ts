import type { Request, Response } from "express";
import { removeAuthCookie, setAuthCookie } from "../lib/authCookie";
import APIError, { apiErrorHandler } from "../lib/error";
import User from "../models/user";

const verify = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id!;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            throw new APIError("User not found", 404);
        }
        res.status(200).json({
            id: user._id,
            username: user.username,
        });
    } catch (error) {
        apiErrorHandler(error, req, res);
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            throw new APIError("User not found", 404);
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            throw new APIError("Invalid credentials", 401);
        }
        setAuthCookie(res, {
            id: user._id,
            username: user.username,
        });
        res.status(200).json({
            id: user._id,
            username: user.username,
        });
    } catch (error: any) {
        apiErrorHandler(error, req, res);
    }
};

const register = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            throw new APIError("User already exists", 400);
        }

        const user = new User({ username, password });
        await user.save();

        setAuthCookie(res, {
            id: user._id,
            username: user.username,
        });
        res.status(201).json({
            id: user._id,
            username: user.username,
        });
    } catch (error: any) {
        apiErrorHandler(error, req, res);
    }
};

const logout = async (req: Request, res: Response) => {
    try {
        removeAuthCookie(res);
        res.status(200).json({ success: true });
    } catch (error: any) {
        apiErrorHandler(error, req, res);
    }
};

const userController = { verify, login, register, logout };
export default userController;
