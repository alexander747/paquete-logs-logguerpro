// decorators.ts
import { getAsyncStorage } from './storage';
import logger from './logger';
import { v4 as uuidv4 } from 'uuid';

export function seguimiento(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const asyncLocalStorage = getAsyncStorage();
        let store = asyncLocalStorage.getStore() || new Map();

        // Establecer 'id-transaction' solo si no existe
        if (!store.has('id-transaction')) {
            const transactionId = uuidv4(); // O usa tu lógica de generación de UUID aquí
            store.set('id-transaction', transactionId);
        }

        // Ejecutar la función dentro del contexto actualizado sin modificar 'isDetailed'
        return asyncLocalStorage.run(store, async () => {
            const transactionId = store.get('id-transaction') || '';

            // logger.info(`Inicio de ${propertyKey} con uuid ${transactionId}`);
            logger.info(`Inicio de ${propertyKey}`);


            try {
                const result = await originalMethod.apply(this, args);
                logger.info(`Fin de ${propertyKey}`);
                return result;
            } catch (error: any) {
                logger.error(`Fin Error en ${propertyKey}: ${error} ${error.message}`);
                throw error;
            }
        });
    };

    return descriptor;
}

export function detail() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const asyncLocalStorage = getAsyncStorage();
            const parentStore = asyncLocalStorage.getStore() || new Map();
            const store = new Map(parentStore); // Clonamos el store

            // Establecer 'isDetailed' solo si no está ya presente en el contexto
            if (!store.has('showDetailsLogs')) {
                store.set('showDetailsLogs', true); // Usamos "si" como valor
                // console.log(`[DEBUG] Estableciendo 'isDetailed' en "si" para la función decorada: ${propertyKey}`);
            }

            // Ejecutar la función dentro del nuevo contexto clonado
            return asyncLocalStorage.run(store, () => {
                return originalMethod.apply(this, args);
            });
        };

        return descriptor;
    };
}