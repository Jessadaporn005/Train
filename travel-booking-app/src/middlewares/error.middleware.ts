import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[Error]', err);
    const status = err.status || 500;
    res.status(status).json({
        message: err.message || 'Something went wrong!',
        status,
    });
};

export default errorHandler;