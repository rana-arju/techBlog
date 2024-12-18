"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
// will call controller function
router.post('/register', (0, validationRequest_1.default)(auth_validation_1.authValidation.registrationValidation), auth_controller_1.userController.registrationUser);
exports.userRoutes = router;
