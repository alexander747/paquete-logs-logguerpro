import { NextFunction, Request, Response } from "express";
import { MockService } from "./mock.service";
import { detail, seguimiento } from "../../paquete/decorators";


// @seguimiento
// @detail()
// export const mockPeticion = async (req: Request, res: Response) => {
//     const mock = new MockService();
//     const data = await mock.mockPeticionService();
//     console.warn("data obtenida ===>", data);
//     return res.json({
//         data,
//         status: 200
//     });
// }

export class MockClass {
    // @seguimiento
    // @detail()
    async mockPeticion(req: Request, res: Response, Next: NextFunction) {
        const mock = new MockService();
        const data = await mock.mockPeticionService();
        console.warn("data obtenida ===>", data);
        return res.json({
            data,
            status: 200
        });
    }
}
