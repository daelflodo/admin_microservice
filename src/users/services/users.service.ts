import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { User } from '../entities/users.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async createUser(data: CreateUserDto) {
    const email = data.email;
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (user) throw new ConflictException('The mail already exists');
    const hashedPassword = await hash(data.password, 10); // El segundo argumento es el número de rondas de hashing (cost factor)
    // Crear un nuevo usuario con la contraseña hasheada
    const newUser = this.userRepository.create({
      ...data,
      email: data.email,
      password: hashedPassword, // Almacena el hash en lugar de la contraseña en texto plano
    });

    await this.userRepository.save(newUser);
    return newUser;
  }

  async updateUser(id: number, payload: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('user no found');
    }
    if (user.isEnabled === payload.isEnabled && user.isEnabled === true) {
      throw new ConflictException('The user is already active');
    }
    if (user.isEnabled === payload.isEnabled && user.isEnabled === false) {
      throw new ConflictException('The user is already deactivated');
    }
    user.isEnabled = payload.isEnabled;
    return await this.userRepository.save(user);
  }

  async getUsers() {
    const users = await this.userRepository.find();
    return users;
  }
  async getUser(id: number) {
    const user = this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('user no found');
    }
    return user;
  }
  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('user no found');
    }
    if (user.isEnabled) {
      throw new ConflictException('Can not delete active users');
    }
    await this.userRepository.delete(id);
  }
}
