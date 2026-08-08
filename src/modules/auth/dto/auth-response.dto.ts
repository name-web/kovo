import { ApiProperty } from '@nestjs/swagger';
import { AuthUserDto } from './auth-user.dto';


export class AuthResponseDto {

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description:
      'Token JWT utilisé pour authentifier les requêtes vers les routes protégées.',
  })
  access_token!: string;


  @ApiProperty({
    type: AuthUserDto,
    description:
      'Informations publiques de l’utilisateur connecté.',
  })
  user!: AuthUserDto;
}