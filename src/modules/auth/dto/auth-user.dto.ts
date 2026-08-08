import { ApiProperty } from '@nestjs/swagger';


export class AuthUserDto {

  @ApiProperty({
    example: '7d4c1070-2943-4a82-9250-659719f19247',
    description: 'Identifiant unique de l’utilisateur.',
  })
  id!: string;


  @ApiProperty({
    example: 'Fanta',
    description: 'Nom complet de l’utilisateur.',
  })
  name!: string;


  @ApiProperty({
    example: 'fanta@gmail.com',
    description: 'Adresse email utilisée pour la connexion.',
  })
  email!: string;
}