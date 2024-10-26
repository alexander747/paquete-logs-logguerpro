// index.ts
import express from 'express';
import { seguimientoMiddleware } from './paquete/middleware';
import { errorHandler } from './paquete/errorHandler';
import routes from './routes';
import { configureLogs } from './paquete/config.logs';

const app = express();


// configuracion de logs 
// Cambiar la configuración global de logs detallados
configureLogs({
    captureHeaderInitialWith: 'x-mesos',
    separateLogswith: '||'
});

// Usar el middleware de seguimiento al inicio
// app.use(seguimientoMiddleware);

// Tus rutas y middlewares aquí...
app.use(routes);

// Manejo de errores
app.use(errorHandler);

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
