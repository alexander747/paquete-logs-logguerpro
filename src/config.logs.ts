// config.logs.ts
import logger from './logger';
import { getAsyncStorage } from './storage';
import { getConfig } from './config';

// Función para configurar los logs
export function configureLogs() {
    // Guardar referencias a las funciones originales
    const originalConsoleLog = console.log;
    const originalConsoleWarn = console.warn;
    const originalConsoleError = console.error;

    // Obtener la configuración global
    const config = getConfig();
    const globalDetailEnabled = config.isDetailed === "si"; // Usamos "si" como valor global

    // Sobrescribir console.log
    console.log = (...args: any[]) => {
        if (globalDetailEnabled) {
            // Si está activado globalmente, forzamos logs detallados
            logger.info(args.map(formatArg).join(' '));
        } else {
            // Si no está activado globalmente, verificamos AsyncLocalStorage
            const asyncLocalStorage = getAsyncStorage();
            const store = asyncLocalStorage.getStore();
            const isDetailed = store && store.get('isDetailed') === "si";

            if (isDetailed) {
                logger.info(args.map(formatArg).join(' '));
            } else {
                // Usar la función original si no está activado
                originalConsoleLog(...args);
            }
        }
    };

    // Sobrescribir console.warn
    console.warn = (...args: any[]) => {
        if (globalDetailEnabled) {
            // Si está activado globalmente, forzamos logs detallados
            logger.warn(args.map(formatArg).join(' '));
        } else {
            const asyncLocalStorage = getAsyncStorage();
            const store = asyncLocalStorage.getStore();
            const isDetailed = store && store.get('isDetailed') === "si";

            if (isDetailed) {
                logger.warn(args.map(formatArg).join(' '));
            } else {
                originalConsoleWarn(...args);
            }
        }
    };

    // Sobrescribir console.error
    console.error = (...args: any[]) => {
        if (globalDetailEnabled) {
            // Si está activado globalmente, forzamos logs detallados
            logger.error(args.map(formatArg).join(' '));
        } else {
            const asyncLocalStorage = getAsyncStorage();
            const store = asyncLocalStorage.getStore();
            const isDetailed = store && store.get('isDetailed') === "si";

            if (isDetailed) {
                logger.error(args.map(formatArg).join(' '));
            } else {
                originalConsoleError(...args);
            }
        }
    };
}

// Función auxiliar para formatear argumentos
function formatArg(arg: any): string {
    if (arg instanceof Error) {
        return arg.stack || arg.toString();
    } else if (typeof arg === 'object') {
        return JSON.stringify(arg);
    } else {
        return arg;
    }
}
