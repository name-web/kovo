import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@/../../generated/prisma';

type SafeUser = Omit<User, 'password'>;

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  private sanitizeUser(user: User): SafeUser {
    const { password, ...safeUser } = user;

    return safeUser;
  }

  async register(createUserDto: CreateUserDto): Promise<SafeUser> {
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('Cet email est déjà utilisé.');
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.sanitizeUser(user);
  }

  async getProfile(id: string): Promise<SafeUser> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable.');
    }

    return this.sanitizeUser(user);
  }

  async updateProfile(
    id: string,
    data: Partial<User>,
  ): Promise<SafeUser> {

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable.');
    }

    if (data.password) {
      data.password = await bcrypt.hash(
        data.password,
        10,
      );
    }

    const updatedUser = await this.userRepository.update(
      id,
      data,
    );

    return this.sanitizeUser(updatedUser);
  }
}