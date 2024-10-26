// config.logs.ts
import logger from './logger';
import { getAsyncStorage } from './storage';
import { getConfig, setConfig } from './config';


interface configuracionInicial {
    showDetailsLogs?: boolean,
    captureHeaderInitialWith?: string,
    separateLogswith?: string
}

// Función para configurar los logs
export function configureLogs(configuration: configuracionInicial = {}) {

    /**CONFIGURAMOS LOS VALORES POR DEFECTO */
    setConfig({
        showDetailsLogs: configuration.showDetailsLogs ?? false,
        captureHeaderInitialWith: configuration.captureHeaderInitialWith ?? '',
        separateLogswith: configuration.separateLogswith ?? ''
    });

    // Guardar referencias a las funciones originales
    const originalConsoleLog = console.log;
    const originalConsoleWarn = console.warn;
    const originalConsoleError = console.error;

    // Obtener la configuración global
    const config = getConfig();
    const globalDetailEnabled = config.showDetailsLogs === true; // Usamos "si" como valor global

    // Sobrescribir console.log
    console.log = (...args: any[]) => {
        if (globalDetailEnabled) {
            // Si está activado globalmente, forzamos logs detallados
            logger.info(args.map(formatArg).join(' '));
        } else {
            // Si no está activado globalmente, verificamos AsyncLocalStorage
            const asyncLocalStorage = getAsyncStorage();
            const store = asyncLocalStorage.getStore();
            const showDetailsLogs = store && store.get('showDetailsLogs') === true;

            if (showDetailsLogs) {
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
            const showDetailsLogs = store && store.get('showDetailsLogs') === true;

            if (showDetailsLogs) {
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
            const showDetailsLogs = store && store.get('showDetailsLogs') === true;

            if (showDetailsLogs) {
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
