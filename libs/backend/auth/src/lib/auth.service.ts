import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { randomInt } from 'node:crypto';
import { Repository } from 'typeorm';

import { AuthConfirm, AuthCredentials, AuthResponse } from '@flashcards/auth/common';
import { UserService } from '@flashcards/backend/users';
import { UserRegister, UserStatus } from '@flashcards/users/common';

import { AuthEntity } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity) private readonly authRepository: Repository<AuthEntity>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async login(credentials: AuthCredentials): Promise<void> {
    const user = await this.userService.findOneByEmail(credentials.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return await this.sendOtp(credentials);
  }

  async confirm(credentials: AuthConfirm): Promise<AuthResponse> {
    const otps = await this.authRepository.find({ where: { email: credentials.email }, order: { id: 'desc' } });
    const otp = otps.length > 0 ? otps[0] : null;

    if (!otp || new Date(otp.validUntil).getTime() < new Date().getTime()) {
      throw new BadRequestException({
        otp: {
          invalid: 'Token is expired',
        },
      });
    }

    const user = await this.userService.findOneByEmail(credentials.email);

    if (!user) {
      throw new InternalServerErrorException({
        user: {
          invalid: 'User not found',
        },
      });
    }

    if (user.status === UserStatus.Created) {
      await this.userService.update(user.uuid, { status: UserStatus.Verified });
    }

    return {
      accessToken: this.jwtService.sign({ uuid: user.uuid }),
      uuid: user.uuid,
    };
  }

  async register(payload: UserRegister): Promise<void> {
    const user = await this.userService.findOneByEmail(payload.email);

    if (user) {
      throw new BadRequestException({
        email: {
          invalid: 'User with email address already exists',
        },
      });
    }

    await this.userService.createUser({
      ...payload,
      status: UserStatus.Created,
    });

    return await this.sendOtp(payload);
  }

  private async sendOtp(credentials: AuthCredentials): Promise<void> {
    const code = randomInt(0, 99999).toString().padStart(5, '0');
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 1);

    const otps = await this.authRepository.find({ where: { email: credentials.email }, order: { id: 'desc' } });
    let otp = otps.length > 0 ? otps[0] : null;

    if (otp && new Date(otp.validUntil).getTime() > new Date().getTime()) {
      await this.authRepository.update({ id: otp.id }, { code, validUntil: validUntil.toISOString() });
    } else {
      otp = await this.authRepository.create({ email: credentials.email, code, validUntil: validUntil.toISOString() });
    }
    await this.authRepository.save(otp);

    await this.mailerService.sendMail({
      to: credentials.email,
      // from: 'noreply@fafn.ru',
      subject: 'Confirm code',
      html: `<p>Ваш код подтверждения: ${code}</p>`,
    });
  }
}
