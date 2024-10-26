import { detail, seguimiento } from "../../paquete/decorators";

export class MockService {
    @seguimiento
    @detail()
    async mockPeticionService() {
        let datos: any = {
            a: 1,
            b: 2
        }
        console.error(datos);
        console.error("Error en mockPeticionService");

        return datos.b;
    }
}