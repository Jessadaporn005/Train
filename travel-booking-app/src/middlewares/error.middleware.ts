import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app.error';
import { logError } from '../utils/logger';
import { httpRequestErrorsTotal } from '../utils/metrics';

const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
        if (process.env.NODE_ENV !== 'test') {
            logError(err.message || 'Unhandled error', { requestId: (req as any).requestId, stack: err.stack, code: err.code });
        }
    if (err instanceof AppError) {
        httpRequestErrorsTotal.inc({ method: req.method, route: req.path, status: String(err.status), code: err.code || 'APP_ERROR' });
        return res.status(err.status).json({ success: false, error: { message: err.message, code: err.code, details: err.details } });
    }
    const status = err.status || 500;
    httpRequestErrorsTotal.inc({ method: req.method, route: req.path, status: String(status), code: 'INTERNAL_ERROR' });
    res.status(status).json({ success: false, error: { message: err.message || 'Internal Server Error', code: 'INTERNAL_ERROR' } });
};

export default errorHandler;
