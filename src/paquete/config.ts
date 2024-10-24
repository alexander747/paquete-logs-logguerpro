// config.ts
export interface SeguimientoConfig {
    headerName: string;
    showDetailsLogs: boolean,
    captureHeaderInitialWith: string

}

export const defaultConfig: SeguimientoConfig = {
    headerName: 'uuid-transaction',
    showDetailsLogs: false,
    captureHeaderInitialWith: ''
};

let config = { ...defaultConfig };

export const setConfig = (newConfig: Partial<SeguimientoConfig>) => {
    config = { ...config, ...newConfig };
};

export const getConfig = (): SeguimientoConfig => config;
