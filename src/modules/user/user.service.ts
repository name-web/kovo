import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    
    if (existingUser) {
      throw new ConflictException('Cet email est déjà utilisé.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return {
      ...user,
      name: user.name ?? '',
    };
  }

  async getProfile(id: string): Promise<any> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable.');
    }

    return {
      ...user,
      name: user.name ?? '',
    };
  }
}