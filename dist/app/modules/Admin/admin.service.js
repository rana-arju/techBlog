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
exports.adminService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_schema_1 = __importDefault(require("../Auth/auth.schema"));
const blog_schema_1 = __importDefault(require("../Blog/blog.schema"));
const userBlockByAdmin = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if user already exists in the database
    const admin = yield auth_schema_1.default.isUserExistById(id);
    const user = yield auth_schema_1.default.isUserExistById(userId);
    if (!admin || admin.isBlocked || (admin === null || admin === void 0 ? void 0 : admin.role) !== 'admin') {
        throw new AppError_1.default(401, 'Invalid user. You can not blocked any user!');
    }
    if (!user || user.isBlocked) {
        throw new AppError_1.default(404, 'User already blocked or not exist');
    }
    const result = yield auth_schema_1.default.findByIdAndUpdate(userId, { isBlocked: true }, {
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(500, 'Failed to block user');
    }
    return result;
});
const deleteBlogByAdmin = (blogId, userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    // this blog exists or not
    const isBlogExist = yield blog_schema_1.default.findById(blogId);
    const user = yield auth_schema_1.default.isUserExistById(userId);
    if (!isBlogExist) {
        throw new AppError_1.default(404, 'This blog not exist');
    }
    if (!user || user.isBlocked || role !== 'admin') {
        throw new AppError_1.default(404, 'Invalid user. You can not delete any blog posts');
    }
    const result = yield blog_schema_1.default.findByIdAndDelete(blogId);
    return result;
});
exports.adminService = {
    userBlockByAdmin,
    deleteBlogByAdmin,
};
