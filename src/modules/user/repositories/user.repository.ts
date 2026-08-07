import { Injectable } from '@nestjs/common';
import { User } from '@/../../generated/prisma';

import { PrismaService } from '../../../database/prisma.service';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}


  async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });
  }


  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }


  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }


  async update(
    id: string,
    data: Partial<CreateUserDto>,
  ): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
}