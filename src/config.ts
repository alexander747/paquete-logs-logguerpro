// config.ts
export interface SeguimientoConfig {
    headerName: string;
    isDetailed: string; // Ahora "si" o "no"
}

export const defaultConfig: SeguimientoConfig = {
    headerName: 'uuid-transaction',
    isDetailed: "no", // Valor por defecto
};

let config = { ...defaultConfig };

export const setConfig = (newConfig: Partial<SeguimientoConfig>) => {
    config = { ...config, ...newConfig };
};

export const getConfig = (): SeguimientoConfig => config;
