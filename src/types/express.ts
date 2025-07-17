import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

// Tipos extendidos para Express 5 compatibilidad
export type Response<ResBody = any> = ExpressResponse<ResBody>;

export type Request<ReqBody = any, ReqQuery = any, Params = any> = ExpressRequest<Params, any, ReqBody, ReqQuery>;

// Tipos específicos para diferentes controladores
export interface CommissionRequestBody {
  instructorId: number;
  percentage: number;
}