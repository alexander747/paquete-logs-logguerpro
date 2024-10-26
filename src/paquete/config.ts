// config.ts
export interface SeguimientoConfig {
    headerName: string;
    showDetailsLogs: boolean,
    captureHeaderInitialWith: string
    separateLogswith: string
}

export const defaultConfig: SeguimientoConfig = {
    headerName: 'id-transaction',
    showDetailsLogs: false,
    captureHeaderInitialWith: '',
    separateLogswith: ''
};

let config = { ...defaultConfig };

export const setConfig = (newConfig: Partial<SeguimientoConfig>) => {
    config = { ...config, ...newConfig };
};

export const getConfig = (): SeguimientoConfig => config;
