import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { UserRegister } from '@flash-cards/users/common';

export class AuthRegister implements UserRegister {
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
