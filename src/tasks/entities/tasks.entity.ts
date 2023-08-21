import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/users.entity'; // Asegúrate de importar la entidad User

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'Pending' })
  status: string;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
