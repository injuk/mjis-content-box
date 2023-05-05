import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import commonConfig from '../config/common.config';
import { ConfigType } from '@nestjs/config';
import { SignInDto } from './dto/sign-in.dto';
import * as jwt from 'jsonwebtoken';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';
import { User } from './domain/authorized-user.entity';

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
    const user = await this.userService.getUserForSignIn(
      dto.email,
      dto.password,
    );
    if (!user) throw new UnauthorizedException(`invalid email or password`);

    const { password, ...userData } = user;

    const token = jwt.sign(userData, this.secret, {
      expiresIn: '5m',
      audience: userData.email,
      issuer: 'mJis.com',
    });
    return { token };
  }

  verify(jwtString: string) {
    try {
      const payload = jwt.verify(jwtString, this.secret) as (
        | jwt.JwtPayload
        | string
      ) &
        User;

      const { id, email, role, nickname, exp } = payload;

      return {
        id,
        email,
        role,
        nickname,
        expiredAt: exp,
      };
    } catch (e) {
      return false;
    }
  }
}
