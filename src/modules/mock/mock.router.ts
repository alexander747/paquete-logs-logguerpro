import { Router } from 'express'
import { mockPeticion } from './mock.controller';
// import { MockClass } from './mock.controller';

const router = Router();
// const a = new MockClass();

router.get('/', [
], mockPeticion)




export default router