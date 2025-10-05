"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestIdMiddleware = requestIdMiddleware;
const crypto_1 = require("crypto");
function requestIdMiddleware(req, res, next) {
    const existing = req.headers['x-request-id'];
    const rid = (Array.isArray(existing) ? existing[0] : existing) || (0, crypto_1.randomUUID)();
    req.requestId = rid;
    res.setHeader('X-Request-Id', rid);
    next();
}
