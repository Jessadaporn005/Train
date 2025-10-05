import { Response } from 'express';

export const success = (res: Response, data: any, status = 200) => res.status(status).json({ success: true, data });
export const created = (res: Response, data: any) => success(res, data, 201);
export const noContent = (res: Response) => res.status(204).send();
export const paginated = (res: Response, data: any[], total: number, page: number, pageSize: number) =>
  res.status(200).json({ success: true, data, meta: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) } });
