// logger.ts
import winston from 'winston';
import { getAsyncStorage } from './storage';
import { getConfig } from './config';

const { combine, timestamp, printf } = winston.format;

const customFormat = printf(({ level, message, timestamp }) => {
    const asyncLocalStorage = getAsyncStorage();
    const store = asyncLocalStorage.getStore();
    const { captureHeaderInitialWith } = getConfig();
    const { separateLogswith } = getConfig()

    const transactionId = store ? store.get('id-transaction') : 'No-UUID';

    // Extraer todos los valores adicionales del contexto (headers)
    const additionalHeaders = store
        ? Array.from(store.entries())
            .filter(([key]) => key.startsWith(captureHeaderInitialWith)) // Filtrar solo los encabezados que comienzan con 'follow-'
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ')
        : '';
    // Formatear el log con timestamp, UUID y los valores adicionales
    if (separateLogswith) {
        return `${timestamp} ${separateLogswith} [${transactionId}] ${additionalHeaders ? `${separateLogswith} ${additionalHeaders}` : ''} ${separateLogswith} ${level}: ${message}`;
    } else {
        return `${timestamp} [${transactionId}] ${additionalHeaders ? `${additionalHeaders}` : ''} ${level}: ${message}`;
    }
});

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(), // Incluye timestamp
        customFormat // Formato personalizado que incluye headers adicionales
    ),
    transports: [
        new winston.transports.Console(),
    ],
});

export default logger;
