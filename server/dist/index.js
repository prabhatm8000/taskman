"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const database_1 = require("./lib/database");
const router_1 = __importDefault(require("./routes/router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json({
    limit: "1mb",
}));
app.use((0, cookie_parser_1.default)());
app.use(router_1.default);
app.listen(3000, () => {
    (0, database_1.connectDB)();
    console.log("Server is running on port 3000");
});
