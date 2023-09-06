import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { AuthConfirm, AuthCredentials } from '@flash-cards/auth/common';
import { formExceptionFactory } from '@flash-cards/backend/core';

import { AuthRegister } from './auth.form';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() credentials: AuthCredentials) {
    return this.authService.login(credentials);
  }

  @Post('auth/register')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: formExceptionFactory,
    }),
  )
  async register(@Body() payload: AuthRegister) {
    return this.authService.register(payload);
  }

  @Post('auth/confirm')
  async confirm(@Body() confirm: AuthConfirm) {
    return this.authService.confirm(confirm);
  }
}
