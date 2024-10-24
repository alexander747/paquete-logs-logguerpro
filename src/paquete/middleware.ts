// middleware.ts
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getConfig } from './config';
import { getAsyncStorage } from './storage';

export const seguimientoMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { headerName } = getConfig();
    const asyncLocalStorage = getAsyncStorage();
    const store = new Map<string, any>();

    // Obtener o generar el transactionId
    let transactionId = req.headers[headerName] as string;
    if (!transactionId) {
        transactionId = uuidv4();
        req.headers[headerName] = transactionId;
    }

    // Agregar el transactionId al store
    store.set('uuid-transaction', transactionId);

    // Agregar el header al response
    res.setHeader(headerName, transactionId);

    // Buscar todos los headers que comiencen por 'follow-' y agregarlos al store y a la respuesta
    const followHeaders = Object.keys(req.headers).filter(header => header.startsWith('follow-'));

    followHeaders.forEach(header => {
        const headerValue = req.headers[header] as string;
        store.set(header, headerValue);  // Guardamos el header en el contexto
        res.setHeader(header, headerValue);  // También lo agregamos a la respuesta
    });

    // Ejecutar el siguiente middleware dentro del contexto de asyncLocalStorage
    asyncLocalStorage.run(store, () => {
        next();
    });
};