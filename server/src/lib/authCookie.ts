import type { Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import envvars from "../contants/envvar";
import APIError from "./error";

const COOKIE_NAME = "auth-cookie";

export const setAuthCookie = (res: Response, payload: any) => {
    const token = jwt.sign({ payload }, envvars.JWT_SECRET, {
        expiresIn: "3d",
    });
    res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3 * 24 * 60 * 60 * 1000,
    });
};

export const getAuthCookie = async (req: any): Promise<any> => {
    const token = req?.cookies?.[COOKIE_NAME];

    if (!token) {
        throw new APIError("", 401, false);
    }

    const decoded = jwt.verify(token, envvars.JWT_SECRET);
    if (typeof decoded === "string" || !decoded.payload) {
        throw new APIError("", 401, false);
    }

    return (decoded as JwtPayload).payload;
};

export const removeAuthCookie = (res: Response) => {
    res.clearCookie(COOKIE_NAME);
};
