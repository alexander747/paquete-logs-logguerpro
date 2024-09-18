// index.ts
import express from 'express';
import { seguimientoMiddleware } from './middleware';
import { errorHandler } from './errorHandler';
import routes from './routes';
import { configureLogs } from './config.logs';
import { setConfig } from './config';

const app = express();


// configuracion de logs 
// Cambiar la configuración global de logs detallados
setConfig({ isDetailed: "no" });
configureLogs();

// Usar el middleware de seguimiento al inicio
app.use(seguimientoMiddleware);

// Tus rutas y middlewares aquí...
app.use(routes);

// Manejo de errores
app.use(errorHandler);

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
