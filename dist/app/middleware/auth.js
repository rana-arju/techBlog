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
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const auth_schema_1 = __importDefault(require("../modules/Auth/auth.schema"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            throw new AppError_1.default(401, 'You are unauthorized to access');
        }
        // if token is valid check
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.token);
        const { role, userId } = decoded;
        const user = yield auth_schema_1.default.isUserExistById(userId);
        if (!user) {
            throw new AppError_1.default(404, 'User not found');
        }
        //checking is user already bloecked or not
        const isBlocked = user === null || user === void 0 ? void 0 : user.isBlocked;
        if (isBlocked) {
            throw new AppError_1.default(403, 'User already blocked');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.default(403, 'You are not authorized to access this resource');
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
