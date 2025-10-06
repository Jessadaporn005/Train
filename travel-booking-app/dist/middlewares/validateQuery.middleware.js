"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = validateQuery;
const app_error_1 = require("../errors/app.error");
function validateQuery(schema) {
    return (req, _res, next) => {
        const result = schema.safeParse(req.query);
        if (!result.success) {
            return next(new app_error_1.ValidationError('Invalid query parameters', result.error.issues));
        }
        req.queryValidated = result.data;
        next();
    };
}
