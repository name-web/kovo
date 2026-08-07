import { User } from '@/../../generated/prisma';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUserRepository {

  create(
    data: CreateUserDto): Promise<User>;

  findByEmail(
    email: string): Promise<User | null>;

  findById(
    id: string): Promise<User | null>;
}
