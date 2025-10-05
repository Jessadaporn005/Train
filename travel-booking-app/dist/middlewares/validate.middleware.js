"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
const app_error_1 = require("../errors/app.error");
function validateBody(schema) {
    return (req, _res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return next(new app_error_1.ValidationError('Invalid request body', result.error.issues));
        }
        req.body = result.data;
        return next();
    };
}
