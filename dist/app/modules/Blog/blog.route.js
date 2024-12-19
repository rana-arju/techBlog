"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const blog_validation_1 = require("./blog.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
router.get('/', blog_controller_1.blogsController.getAlldBlogs);
router.post('/', (0, auth_1.default)('admin', 'user'), (0, validationRequest_1.default)(blog_validation_1.blogValidation.blogCreateValidation), blog_controller_1.blogsController.createBlog);
router.delete('/:id', (0, auth_1.default)('user', 'admin'), blog_controller_1.blogsController.deletedBlog);
router.patch('/:id', (0, auth_1.default)('user'), (0, validationRequest_1.default)(blog_validation_1.blogValidation.blogUpdateValidation), blog_controller_1.blogsController.updateBlog);
exports.blogRouter = router;
