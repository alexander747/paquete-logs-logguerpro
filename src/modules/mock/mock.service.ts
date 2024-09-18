import { detail, seguimiento } from "../../decorators";

export class MockService {
    // @seguimiento
    @detail()
    async mockPeticionService() {
        let datos: any = {
            a: 1,
            b: 2
        }
        console.log(datos);
        return datos.b;
    }
}