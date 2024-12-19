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
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
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
const updateBlogPost = (id, userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if user already exists in the database
    const user = yield auth_schema_1.default.findById(userId);
    const isBlogExist = yield blog_schema_1.default.findById(id);
    if (!user || user.isBlocked) {
        throw new AppError_1.default(404, 'Invalid user. You can not update this blog');
    }
    const author = isBlogExist === null || isBlogExist === void 0 ? void 0 : isBlogExist.author;
    if ((author === null || author === void 0 ? void 0 : author.toString()) !== userId) {
        throw new AppError_1.default(403, 'You can not update this blog');
    }
    const result = yield blog_schema_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(500, 'Failed to update blog post');
    }
    return result;
});
const deleteBlogPost = (id, userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    // this blog exists or not
    const isBlogExist = yield blog_schema_1.default.findById(id);
    const user = yield auth_schema_1.default.findById(userId);
    if (!isBlogExist) {
        throw new AppError_1.default(404, 'This blog post not exist');
    }
    if (!user || user.isBlocked) {
        throw new AppError_1.default(404, 'Invalid user. You can not update this blog');
    }
    // Check if user already exists in the database
    if (role === 'admin') {
        const result = yield blog_schema_1.default.findByIdAndDelete(id);
        console.log('result admin', result);
        return result;
    }
    if (isBlogExist.author.toString() !== userId) {
        throw new AppError_1.default(403, 'You can not delete this blog');
    }
    const result = yield blog_schema_1.default.findByIdAndDelete(id);
    console.log('result', result);
    return result;
});
const getAllBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = ['title', 'content'];
    const blogs = new QueryBuilder_1.default(blog_schema_1.default.find().populate('author'), query)
        .search(searchableFields)
        .filter()
        .sort()
        .paginate()
        .select();
    const result = yield blogs.modelQuery;
    return result;
});
exports.blogService = {
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    getAllBlogs,
};
