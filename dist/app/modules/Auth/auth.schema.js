"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
            },
            message: '{VALUE} is not a valid email',
        },
        immutable: true,
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: '{VALUE} is not valid, please provide a valid role',
        },
        default: 'user',
        required: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        select: 0,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
