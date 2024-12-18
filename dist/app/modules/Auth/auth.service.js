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
exports.authServices = void 0;
const auth_schema_1 = __importDefault(require("./auth.schema"));
const registrationUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if user already exists in the database
    const user = yield auth_schema_1.default.isUserExistByEmail(userData.email);
    if (user) {
        throw new Error('User already exists.');
    }
    const result = yield auth_schema_1.default.create(userData);
    return result;
});
exports.authServices = {
    registrationUserIntoDB,
};
