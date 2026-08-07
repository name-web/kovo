import {ConflictException, Injectable, NotFoundException,} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async register(
    createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {

    const existingUser =
      await this.userRepository.findByEmail(
        createUserDto.email,
      );

    if (existingUser) {
      throw new ConflictException(
        'Cet email est déjà utilisé.',
      );
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }


  async getProfile(
    id: string,
  ): Promise<UserResponseDto> {

    const user =
      await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(
        'Utilisateur introuvable.',
      );
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}