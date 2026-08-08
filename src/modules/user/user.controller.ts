import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

interface AuthUser {
  id: string;
  email: string;
}

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Inscrire un nouvel utilisateur',
  })
  @ApiResponse({
    status: 201,
    description: 'Utilisateur créé avec succès.',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Données invalides.',
  })
  @ApiResponse({
    status: 409,
    description: 'Email déjà utilisé.',
  })
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.register(createUserDto);
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Récupérer le profil de l’utilisateur connecté',
  })
  @ApiResponse({
    status: 200,
    description: 'Profil récupéré avec succès.',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Token manquant ou invalide.',
  })
  async getProfile(@CurrentUser() user: AuthUser): Promise<UserResponseDto> {
    try {
      console.log('========== GET PROFILE ==========');
      console.log('CURRENT USER:', user);
      console.log('USER ID:', user?.id);
      console.log('USER EMAIL:', user?.email);

      if (!user) {
        throw new Error('CurrentUser est undefined.');
      }

      if (!user.id) {
        throw new Error('CurrentUser existe mais user.id est undefined.');
      }

      console.log('Recherche utilisateur avec ID:', user.id);

      const profile = await this.userService.getProfile(user.id);

      console.log('PROFILE TROUVE:', profile);

      console.log('================================');

      return profile;
    } catch (error) {
      console.error('========== GET PROFILE ERROR ==========');

      console.error('Erreur:', error);

      console.error('Message:', error instanceof Error ? error.message : error);

      console.error('Stack:', error instanceof Error ? error.stack : undefined);

      console.error('=======================================');

      throw new InternalServerErrorException(
        'Erreur lors de la récupération du profil.',
      );
    }
  }

  @Put('profile')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Modifier le profil de l’utilisateur connecté',
  })
  @ApiResponse({
    status: 200,
    description: 'Profil mis à jour avec succès.',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Token manquant ou invalide.',
  })
  async updateProfile(
    @CurrentUser() user: AuthUser,
    @Body() data: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.updateProfile(user.id, data);
  }
}
