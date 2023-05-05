import { Inject, Injectable } from '@nestjs/common';
import commonConfig from '../config/common.config';
import { ConfigType } from '@nestjs/config';
import { SignInDto } from './dto/sign-in.dto';
import * as jwt from 'jsonwebtoken';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly secret;
  constructor(
    @Inject(commonConfig.KEY) private config: ConfigType<typeof commonConfig>,
    private readonly userService: UsersService,
  ) {
    this.secret = this.config.auth.jwtSecret;
  }

  signUp(dto: SignUpDto) {
    return this.userService.createUser(dto);
  }

  async signIn(dto: SignInDto) {
    const user = await this.userService.getUserByEmail(dto.email);

    return jwt.sign(dto, this.secret, {
      expiresIn: '1d',
      audience: user.email,
      issuer: 'mJis.com',
    });
  }
}
