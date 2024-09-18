import { Router } from "express";
import mockRouter from './modules/mock/mock.router';

const routes = Router()

routes.get('/', (req, res) => res.send('Online'));
routes.use('/mock', mockRouter);

export default routes;
