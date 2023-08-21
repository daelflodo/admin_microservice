import { EntityRepository, Repository } from 'typeorm';
import { User } from '../users/entities/users.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Agrega métodos personalizados para operaciones relacionadas con la entidad Diet
}
