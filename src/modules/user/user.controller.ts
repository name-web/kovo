import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}



  
  @Post('register')
  @ApiOperation({ 
    summary: 'Inscrire un nouvel utilisateur' 
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Utilisateur créé avec succès.',
    type: UserResponseDto,
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Données invalides.' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Email déjà utilisé.' 
  })
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.register(createUserDto);
  }





  @Get('profile/:id')
  @ApiOperation({ 
    summary: 'Récupérer le profil d’un utilisateur' 
  })
  @ApiResponse({ 
    status: 200,
    description: 'Profil récupéré avec succès.',
    type: UserResponseDto,
  })
  @ApiResponse({ 
    status: 404,
    description: 'Utilisateur introuvable.'
  })
  async getProfile(
    @Param('id') id: string,
  ): Promise<UserResponseDto> {
    return this.userService.getProfile(id);
  }
}