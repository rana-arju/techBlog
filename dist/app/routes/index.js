"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/Auth/auth.route");
const blog_route_1 = require("../modules/Blog/blog.route");
const router = (0, express_1.Router)();
const moduleRouter = [
    {
        path: '/auth',
        module: auth_route_1.userRoutes,
    },
    {
        path: '/blogs',
        module: blog_route_1.blogRouter,
    },
];
moduleRouter.forEach((route) => {
    router.use(route.path, route.module);
});
exports.default = router;
