import type { Request, Response } from "express";

class APIError extends Error {
    public status: number;
    public success: boolean;

    constructor(message: string, status = 500, success = false) {
        super(message);
        this.status = status;
        this.success = success;
    }
}

export const apiErrorHandler = (error: any, req: Request, res: Response) => {
    if (error instanceof APIError) {
        res.status(error.status).json({
            success: error.success,
            message: error.message,
        });
    } else {
        console.log(req.url, error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export default APIError;
