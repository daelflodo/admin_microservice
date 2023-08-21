import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayService {
  getHello(): string {
    return 'Hello from Gateway!';
  }

  // Agrega aquí los métodos y lógica necesarios para manejar las solicitudes a los microservicios subyacentes
  // Ejemplo:
  getUsers(): string {
    return 'Get users from Users microservice';
  }
}
