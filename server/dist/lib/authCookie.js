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
exports.removeAuthCookie = exports.getAuthCookie = exports.setAuthCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envvar_1 = __importDefault(require("../contants/envvar"));
const error_1 = __importDefault(require("./error"));
const COOKIE_NAME = "auth-cookie";
const setAuthCookie = (res, payload) => {
    const token = jsonwebtoken_1.default.sign({ payload }, envvar_1.default.JWT_SECRET, {
        expiresIn: "3d",
    });
    res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3 * 24 * 60 * 60 * 1000,
    });
};
exports.setAuthCookie = setAuthCookie;
const getAuthCookie = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a[COOKIE_NAME];
    if (!token) {
        throw new error_1.default("", 401, false);
    }
    const decoded = jsonwebtoken_1.default.verify(token, envvar_1.default.JWT_SECRET);
    if (typeof decoded === "string" || !decoded.payload) {
        throw new error_1.default("", 401, false);
    }
    return decoded.payload;
});
exports.getAuthCookie = getAuthCookie;
const removeAuthCookie = (res) => {
    res.clearCookie(COOKIE_NAME);
};
exports.removeAuthCookie = removeAuthCookie;
