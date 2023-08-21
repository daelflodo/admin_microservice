import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiracion: true,
      secretOrKey: process.env.JWT_SECRET || 'tu_secreto', // Debes proporcionar tu clave secreta aquí
    });
  }
  async validate(payload: any) {
    return { userId: payload.id, name: payload.name };
  }
}
