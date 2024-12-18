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
exports.blogService = void 0;
const auth_schema_1 = __importDefault(require("../Auth/auth.schema"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_schema_1 = __importDefault(require("./blog.schema"));
const createBlogPost = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if user already exists in the database
    const user = yield auth_schema_1.default.findById(payload.author);
    if (!user || user.isBlocked) {
        throw new AppError_1.default(404, 'Invalid user. You can not create a blog post');
    }
    const result = yield blog_schema_1.default.create(payload);
    if (!result) {
        throw new AppError_1.default(500, 'Failed to create blog post');
    }
    return result;
});
exports.blogService = {
    createBlogPost,
};
