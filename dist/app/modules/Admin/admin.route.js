"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const admin_controller_1 = require("./admin.controller");
const router = (0, express_1.Router)();
router.delete('/blogs/:id', (0, auth_1.default)('admin'), admin_controller_1.adminController.deletedBlogByAdmin);
router.patch('/:userId/block', (0, auth_1.default)('admin'), admin_controller_1.adminController.userBlocked);
exports.adminRouter = router;
