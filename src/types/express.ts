import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

// Tipos extendidos para Express 5 compatibilidad
export interface Request<P = {}, ResBody = any, ReqBody = any, ReqQuery = any> extends ExpressRequest<P, ResBody, ReqBody, ReqQuery> {
  body: ReqBody;
}

export interface Response<ResBody = any> extends ExpressResponse<ResBody> {
   status(code: number): this;
 }

// Tipos específicos para diferentes controladores
export interface CommissionRequestBody {
  instructorId: number;
  percentage: number;
}