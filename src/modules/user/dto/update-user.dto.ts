import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'Kamal',
    description: 'Nom de l’utilisateur',
  })
  @IsString()
  @IsNotEmpty({ message: 'Le nom est obligatoire.' })
  name?: string;

  @ApiPropertyOptional({
    example: 'kamal@test.com',
    description: 'Adresse email de l’utilisateur',
  })
  @IsEmail({}, { message: "L'adresse email doit être valide." })
  @IsNotEmpty({ message: "L'email est obligatoire." })
  email?: string;

  @ApiPropertyOptional({
    example: 'nouveauMotDePasse123',
    description: 'Nouveau mot de passe',
  })
  @IsString()
  @IsNotEmpty({ message: 'Le mot de passe est obligatoire.' })
  password?: string;
}
