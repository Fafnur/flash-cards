import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { AuthRegister } from '@flashcards/auth/common';

export class AuthRegisterForm implements AuthRegister {
  @IsNotEmpty()
  @IsString()
  @Length(1, 60)
  firstname!: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 60)
  lastname!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
