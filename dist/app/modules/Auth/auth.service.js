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
exports.authServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_schema_1 = __importDefault(require("./auth.schema"));
const auth_utils_1 = require("./auth.utils");
const registrationUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if user already exists in the database
    const user = yield auth_schema_1.default.isUserExistByEmail(userData.email);
    if (user) {
        throw new Error('User already exists.');
    }
    const result = yield auth_schema_1.default.create(userData);
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_schema_1.default.findOne({ email: payload.email }).select('+password');
    if (!(yield auth_schema_1.default.isUserExistByEmail(payload === null || payload === void 0 ? void 0 : payload.email)) ||
        !(yield auth_schema_1.default.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password)) ||
        (user === null || user === void 0 ? void 0 : user.isBlocked)) {
        throw new AppError_1.default(401, 'Invalid credentials');
    }
    const jwtPayload = {
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.token, config_1.default.token_time);
    return { token: accessToken };
});
exports.authServices = {
    registrationUserIntoDB,
    loginUser,
};
