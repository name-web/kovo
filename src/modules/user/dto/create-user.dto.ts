import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Kamal',
    description: 'Nom de l’utilisateur',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'kamal@test.com',
    description: 'Adresse email de l’utilisateur',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    example: 'motDePasse123',
    description: 'Mot de passe de l’utilisateur',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}
