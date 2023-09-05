import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

import { AuthCredentials, AuthResponse } from '@flash-cards/auth/common';
import { UserService } from '@flash-cards/backend/users';
import { User, UserRegister, UserStatus } from '@flash-cards/users/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async validateUserCredentials(credentials: AuthCredentials): Promise<User | null> {
    const user = await this.userService.findOneByEmail(credentials.email);

    const valid = user && user.createdAt;

    if (user && valid) {
      return user;
    }

    return null;
  }

  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    const user = await this.validateUserCredentials(credentials);

    if (!user || user.status === UserStatus.Created) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: this.jwtService.sign({ uuid: user.uuid }),
      uuid: user.uuid,
    };
  }

  // async reset(secrets: AuthSecrets): Promise<void> {
  //   const user = (await this.userService.findOneByEmail(secrets.email)) ?? null;
  //
  //   if (!user) {
  //     throw new BadRequestException();
  //   }
  //   const resetToken = this.passwordService.generatePassword();
  //
  //   if (this.frontUrl.indexOf('localhost') < 0) {
  //     await this.mailerService.sendMail({
  //       to: secrets.email,
  //       subject: 'Reset password',
  //       template: 'reset',
  //       context: {
  //         link: `${this.frontUrl}/auth/password/change?token=${resetToken}`,
  //       },
  //     });
  //   }
  //
  //   const resetAt = new Date();
  //   resetAt.setDate(resetAt.getDate() + 1);
  //
  //   return await this.userService.update(user.uuid, { reset: resetToken, resetAt: resetAt.toISOString() }).then(() => undefined);
  // }

  async register(payload: UserRegister): Promise<AuthResponse> {
    const user = await this.userService.findOneByEmail(payload.email);

    if (user) {
      throw new BadRequestException({
        email: {
          invalid: 'User with email address already exists',
        },
      });
    }
    const confirmAt = new Date();
    confirmAt.setDate(confirmAt.getDate() + 1);

    const userCreated = await this.userService.createUser({
      ...payload,
      status: UserStatus.Created,
      confirm: token,
      confirmAt: confirmAt.toISOString(),
    });

    if (this.frontUrl.indexOf('localhost') < 0) {
      await this.mailerService.sendMail({
        to: payload.email,
        subject: 'Confirm email',
        template: 'confirm',
        context: {
          link: `${this.frontUrl}/auth/email/confirm?token=${token}`,
        },
      });
    }

    return {
      accessToken: this.jwtService.sign({ userId: userCreated.id }),
      uuid: userCreated.uuid,
    };
  }
}
