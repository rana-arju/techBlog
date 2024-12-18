"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        message: data.message,
        data: data.data,
        success: data.success,
    });
};
exports.default = sendResponse;
