import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Le nom est obligatoire.' })
  name!: string;

  @IsEmail({}, { message: 'L\'adresse email doit être valide.' })
  @IsNotEmpty({ message: 'L\'email est obligatoire.' })
  email!: string;
}