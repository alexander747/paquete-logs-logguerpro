// errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { getAsyncStorage } from './storage';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const asyncLocalStorage = getAsyncStorage();
    const store = asyncLocalStorage.getStore();
    const transactionId = store ? store.get('uuid-transaction') : null;
    console.error(`[${transactionId}] - Unhandled Error:`, err);
    return res.status(500).send({ error: 'Internal Server Error paquetes' });
};
