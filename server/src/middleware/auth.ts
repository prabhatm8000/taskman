import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { getAuthCookie } from "../lib/authCookie";
import APIError, { apiErrorHandler } from "../lib/error";
import type { IUser } from "../models/user";
import User from "../models/user";

// adding user to request
declare global {
    namespace Express {
        interface Request {
            user?: Pick<IUser, "id" | "username">;
        }
    }
}

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const payload = await getAuthCookie(req);
        const user = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(payload.id),
                },
            },
            {
                $project: {
                    _id: 1,
                    username: 1,
                },
            },
        ]);
        if (user.length === 0) {
            throw new APIError("", 401, false);
        }

        req.user = {
            id: user[0]._id,
            username: user[0].username,
        };
        next();
    } catch (error) {
        apiErrorHandler(error, req, res);
    }
};

export default authMiddleware;
