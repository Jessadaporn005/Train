"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const schemas_1 = require("../validators/schemas");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
// bind this to preserve context if using class methods (or convert to arrow functions)
router.post('/register', (0, validate_middleware_1.validateBody)(schemas_1.registerSchema), authController.register.bind(authController));
router.post('/login', (0, validate_middleware_1.validateBody)(schemas_1.loginSchema), authController.login.bind(authController));
exports.default = router;
