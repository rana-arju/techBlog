"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidation = void 0;
const zod_1 = require("zod");
const blogCreateValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        content: zod_1.z.string({
            required_error: 'Please write something',
        }),
        author: zod_1.z.string({
            required_error: 'Author is required',
        }),
        isPublished: zod_1.z.boolean().default(true),
    }),
});
exports.blogValidation = {
    blogCreateValidation,
};
