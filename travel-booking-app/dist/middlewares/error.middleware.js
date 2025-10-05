"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, _req, res, _next) => {
    console.error('[Error]', err);
    const status = err.status || 500;
    res.status(status).json({
        message: err.message || 'Something went wrong!',
        status,
    });
};
exports.default = errorHandler;
