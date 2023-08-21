import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/users.entity';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async aunthenticate(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('user not found'); // Usuario no encontrado.
    if (!user.isEnabled) throw new UnauthorizedException('Unauthorized user');
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('invalid credentials.'); // Contraseña incorrecta.
    const payload = { id: user.id, name: user.name };
    const token = this.jwtService.sign(payload);
    console.log(token);
    const data = {
      user,
      token,
    };
    return data;
  }
}
