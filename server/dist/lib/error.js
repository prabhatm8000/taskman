"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorHandler = void 0;
class APIError extends Error {
    constructor(message, status = 500, success = false) {
        super(message);
        this.status = status;
        this.success = success;
    }
}
const apiErrorHandler = (error, req, res) => {
    if (error instanceof APIError) {
        res.status(error.status).json({
            success: error.success,
            message: error.message,
        });
    }
    else {
        console.log(req.url, error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.apiErrorHandler = apiErrorHandler;
exports.default = APIError;
